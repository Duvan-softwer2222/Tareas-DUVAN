var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

var weatherforecast = new List<WeatherForecast>();

//GET: Obtener un recurso
app.MapGet("/weatherforecast/{index}", (int index) =>
{
    //Validar si index es menor a cero o index es mayor al count de lista status  code 404
    return Results.Ok(weatherforecast[index]);

});


//POST: Crear un nuevo recurso
app.MapPost("/weatherforecast", (WeatherForecast weather) =>
{
    weatherforecast.Add(weather);
    return Results.Created($"/weatherforecast/{weatherforecast.Count -1}", weather);

});

app.MapGet("/weatherforecast", () => weatherforecast)
.WithName("GetWeatherForecast");


app.MapPut("/weatherforecast/{index}", (int index, WeatherForecast updatedWeather) =>
{
    if (index < 0 || index >= weatherforecast.Count)
    {
        return Results.NotFound(new { Message = "Índice fuera de rango." });
    }

    weatherforecast[index] = updatedWeather;
    return Results.Ok(new { Message = "Recurso actualizado correctamente.", Weather = updatedWeather });
});


app.MapDelete("/weatherforecast/{index}", (int index) =>
{
    if (index < 0 || index >= weatherforecast.Count)
    {
        return Results.NotFound(new { Message = "Índice fuera de rango." });
    }

    weatherforecast.RemoveAt(index);
    return Results.Ok(new { Message = "Recurso eliminado correctamente." });
});



app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}


