namespace BlazorWasm.Common.Extensions
{
    public static class LinqExtensions
    {
        public static IEnumerable<T> DistinctBy<T>(this IEnumerable<T> list, Func<T, object> propertySelector)
            => list.GroupBy(propertySelector)
                .Select(x => x.First());

        public static bool NotAny<T>(this IEnumerable<T> list)
            => !list.Any();

        public static bool NotAny<T>(this IEnumerable<T> list, Func<T, bool> predicate)
            => !list.Any(predicate);

        public static IEnumerable<T> WhereNotNull<T>(this IEnumerable<T> list)
            => list.Where(x => x != null);
    }
}