using Microsoft.AspNetCore.Mvc;
using Yugioh.Infrastructure;

namespace Yugioh.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CardsController : ControllerBase
{
    private readonly YgoApiClient _client;

    public CardsController(YgoApiClient client)
    {
        _client = client;
    }

    [HttpGet]
    public async Task<IActionResult> Search(
        [FromQuery] string? name = null,
        [FromQuery] string? type = null,
        [FromQuery] string? race = null,
        [FromQuery] string? attribute = null,
        [FromQuery] int? atkMin = null, [FromQuery] int? atkMax = null,
        [FromQuery] int? defMin = null, [FromQuery] int? defMax = null,
        [FromQuery] int? levelMin = null, [FromQuery] int? levelMax = null,
        [FromQuery] int? linkval = null,
        [FromQuery] int? scaleMin = null, [FromQuery] int? scaleMax = null)
    {
        var hasAny =
            !string.IsNullOrWhiteSpace(name) ||
            !string.IsNullOrWhiteSpace(type) ||
            !string.IsNullOrWhiteSpace(race) ||
            !string.IsNullOrWhiteSpace(attribute) ||
            atkMin.HasValue || atkMax.HasValue ||
            defMin.HasValue || defMax.HasValue ||
            levelMin.HasValue || levelMax.HasValue ||
            linkval.HasValue ||
            scaleMin.HasValue || scaleMax.HasValue;

        if (!hasAny)
            return BadRequest(new { error = "En az bir arama parametresi giriniz." });

        var cards = await _client.SearchCards(
            name, type, race, attribute,
            atkMin, atkMax,
            defMin, defMax,
            levelMin, levelMax,
            linkval,
            scaleMin, scaleMax);

        return Ok(cards);
    }
}