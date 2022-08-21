using System.Reflection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace BlazorServer.Common.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection TryAddOneToOneImplementationsTransient(
            this IServiceCollection services,
            Assembly assembly,
            string rootNamespace,
            List<Type> interfacesToIgnore = null)
            => services.TryAddOneToOneImplementationsTransient<object>(assembly, rootNamespace, null, interfacesToIgnore);

        public static IServiceCollection TryAddOneToOneImplementationsTransient<TOut>(
            this IServiceCollection services,
            Assembly assembly,
            string rootNamespace,
            Func<IServiceProvider, TOut> parameterBuilderFunc,
            List<Type> interfacesToIgnore = null)
        {
            var allImplementors = assembly.GetTypes()
                .Where(
                    x => x.IsClass
                         // Implements an interface defined in this solution's root namespace, except ignored interfaces
                         && x.GetInterfaces()
                             .Where(i => i.Assembly.FullName?.StartsWith(rootNamespace) ?? false)
                             .Except(interfacesToIgnore ?? new List<Type>())
                             .Any()
                         // Must have exactly one constructor
                         && x.GetConstructors()
                             .Length
                         == 1
                         // Constructor should take no value types nor strings as parameters (only dependency injection)
                         && x.GetConstructors()
                             .First()
                             .GetParameters()
                             .NotAny(p => p.ParameterType.IsValueType || p.ParameterType == typeof(string)))
                .ToList();

            foreach (var implementation in allImplementors)
            {
                var interfaces = implementation.GetInterfaces()
                    .Where(i => i.Assembly.FullName?.StartsWith(rootNamespace) ?? false)
                    .Except(interfacesToIgnore ?? new List<Type>());

                foreach (var @interface in interfaces)
                {
                    var implementors = allImplementors.Where(x => x.IsAssignableTo(@interface))
                        .ToList();

                    // Only attempt to perform a service registration if the implementing class is the only implementing class of that interface.
                    if (implementors.Count == 1)
                    {
                        var implementor = implementors.First();
                        var constructors = implementor.GetConstructors();

                        // Always expect one and exactly one constructor in the implementing class (parameterless or otherwise)
                        if (constructors.Length == 1)
                        {
                            var constructorParameters = constructors.First()
                                .GetParameters();

                            if (implementor.ContainsGenericParameters && @interface.ContainsGenericParameters)
                            {
                                // For some reason, the C# type system has a difference between the interface type retrieved via "GetInterfaces()" vs. the interface's actual "generic type definition". Specifically, one of the differences can be observed in the fact that the "FullName" property of the interface from "GetInterfaces()" is null, whereas for the generic type definition of the interface, FullName is defined. We have to register the interface with its generic type definition, in order for the registration of the generic-to-generic interface-to-implementation registration to work correctly in the DependencyInjection container.
                                var genericInterfaceDefinition = @interface.GetGenericTypeDefinition();

                                // Verify that the amount of generic parameters are the same, otherwise we are unable to handle this scenario.
                                if (implementor.GetGenericArguments()
                                        .Length
                                    == genericInterfaceDefinition.GetGenericArguments()
                                        .Length)
                                    services.TryAddTransient(genericInterfaceDefinition, implementor);
                            }
                            else
                            {
                                if (constructorParameters.Length == 1
                                    && constructorParameters.First()
                                        .ParameterType
                                    == typeof(TOut)
                                    && parameterBuilderFunc != null)
                                    // Apply the given parameterBuilderFunc if defined
                                    services.TryAddTransient(@interface, sp => Activator.CreateInstance(implementor, parameterBuilderFunc(sp)));
                                else
                                    // Register as a simple dependency with no special arguments required
                                    // Assumption: All parameters to the constructor are also registered dependencies
                                    services.TryAddTransient(@interface, implementor);
                            }
                        }
                    }
                }
            }

            return services;
        }
    }
}