global using BlazorWasm.Common;
global using BlazorWasm;
using BlazorWasm.Common.Extensions;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using System.Reflection;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddSingleton<SummerUniHttpClient>();

//Magic - dont look at this
builder.Services.TryAddOneToOneImplementationsTransient(Assembly.GetExecutingAssembly(), nameof(BlazorWasm));

await builder.Build().RunAsync();
