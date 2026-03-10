using System.Text.Json.Serialization;

namespace Yugioh.Domain;

public class Card
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Type { get; set; }

    public string FrameType { get; set; }

    public string Desc { get; set; }

    public int? Atk { get; set; }

    public int? Def { get; set; }

    public int? Level { get; set; }

    public string Race { get; set; }

    public string Attribute { get; set; }

    public string Archetype { get; set; }

    [JsonPropertyName("card_images")]
    public List<CardImage> CardImages { get; set; }

    [JsonPropertyName("misc_info")]
    public List<MiscInfo>? MiscInfo { get; set; }

    [JsonPropertyName("linkval")]
    public int? Linkval { get; set; }
}