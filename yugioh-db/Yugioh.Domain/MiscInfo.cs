using System.Text.Json.Serialization;

namespace Yugioh.Domain;

public class MiscInfo
{
    [JsonPropertyName("tcg_date")]
    public string? TcgDate { get; set; }

    [JsonPropertyName("ocg_date")]
    public string? OcgDate { get; set; }
}