global using BlazorServer.Common;
using BlazorServer.Common.Extensions;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

builder.Services.AddSingleton<SummerUniHttpClient>();

//Magic - dont look at this
builder.Services.TryAddOneToOneImplementationsTransient(Assembly.GetExecutingAssembly(), nameof(BlazorServer));

var app = builder.Build();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();