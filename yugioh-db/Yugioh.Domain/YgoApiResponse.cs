using System.Text.Json.Serialization;

namespace Yugioh.Domain;

public class YgoApiResponse
{
    [JsonPropertyName("data")]
    public List<Card> Data { get; set; }
}