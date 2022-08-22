using System.Net.Http.Headers;

namespace BlazorWasm.Common;

public class SummerUniHttpClient : HttpClient
{
    public SummerUniHttpClient()
    {
        BaseAddress = new Uri("http://localhost:8080");
    }

    public void SetToken(string token) => DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
}
