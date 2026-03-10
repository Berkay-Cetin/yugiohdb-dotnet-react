using System.Text.Json;
using Yugioh.Domain;

namespace Yugioh.Infrastructure;

public class YgoApiClient
{
    private readonly HttpClient _httpClient;

    public YgoApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Card>> SearchCards(
        string? name = null,
        string? type = null,
        string? race = null,
        string? attribute = null,
        int? atkMin = null, int? atkMax = null,
        int? defMin = null, int? defMax = null,
        int? levelMin = null, int? levelMax = null,
        int? linkval = null,
        int? scaleMin = null, int? scaleMax = null)
    {
        var queryParams = new List<string>();

        // fname hem isim hem kart metni içinde arar
        if (!string.IsNullOrWhiteSpace(name))
            queryParams.Add($"fname={Uri.EscapeDataString(name)}");

        if (!string.IsNullOrWhiteSpace(type))
            queryParams.Add($"type={Uri.EscapeDataString(type)}");

        if (!string.IsNullOrWhiteSpace(race))
            queryParams.Add($"race={Uri.EscapeDataString(race)}");

        if (!string.IsNullOrWhiteSpace(attribute))
            queryParams.Add($"attribute={Uri.EscapeDataString(attribute)}");

        if (atkMin.HasValue) queryParams.Add($"atk=gte{atkMin.Value}");
        if (atkMax.HasValue) queryParams.Add($"atk=lte{atkMax.Value}");

        if (defMin.HasValue) queryParams.Add($"def=gte{defMin.Value}");
        if (defMax.HasValue) queryParams.Add($"def=lte{defMax.Value}");

        if (levelMin.HasValue) queryParams.Add($"level=gte{levelMin.Value}");
        if (levelMax.HasValue) queryParams.Add($"level=lte{levelMax.Value}");

        if (linkval.HasValue) queryParams.Add($"linkval={linkval.Value}");

        if (scaleMin.HasValue) queryParams.Add($"scale=gte{scaleMin.Value}");
        if (scaleMax.HasValue) queryParams.Add($"scale=lte{scaleMax.Value}");

        if (queryParams.Count == 0)
            return new List<Card>();

        var url = $"https://db.ygoprodeck.com/api/v7/cardinfo.php?{string.Join("&", queryParams)}&misc=yes";

        var response = await _httpClient.GetAsync(url);

        if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
            return new List<Card>();

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<YgoApiResponse>(json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        return result?.Data ?? new List<Card>();
    }
}