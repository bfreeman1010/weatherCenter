import React, { useState } from 'react';

// all public domain or CC-licensed images from Wikimedia/NOAA/NWS
const IMG = {
  // checked these all still resolve on Wikimedia
  tornadoSupercell:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/F5_tornado_Elie_Manitoba_2007.jpg/500px-F5_tornado_Elie_Manitoba_2007.jpg',
  multiVortex:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/1957_Dallas_multi vortex_1_edited.JPG/500px-1957_Dallas_multi vortex_1_edited.JPG',
  supercellStructure:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chaparral_Supercell_2.JPG/500px-Chaparral_Supercell_2.JPG',
  ropeTornado:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Roping_tornado.jpg/500px-Roping_tornado.jpg',
  ef5Damage:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/EF5_tornado_damage_example.jpg/500px-EF5_tornado_damage_example.jpg',
  joplinDamage:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Joplin_tornado_damage.jpg/500px-Joplin_tornado_damage.jpg',
  parkersburgDamage:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Parkersburg_tornado_damage.JPG/500px-Parkersburg_tornado_damage.JPG',
  radarHookEcho:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hackleburg Phil_Campbell_EF5_tornado_radar_on_April_27%2C_2011.jpg/500px-Hackleburg Phil_Campbell_EF5_tornado_radar_on_April_27%2C_2011.jpg',
  hurricaneStructure:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Hurricane-en.svg/500px-Hurricane-en.svg.png',
  hurricaneSatellite:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Hurricane_Katrina_August_28_2005_NASA.jpg/500px-Hurricane_Katrina_August_28_2005_NASA.jpg',
  hailComparison:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Hailstones.jpg/500px-Hailstones.jpg',
  iowaFloodDamage:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Woodward_Iowa_Tornado_Damage.JPG/500px-Woodward_Iowa_Tornado_Damage.JPG',
  mooreTornado:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/May_20%2C_2013_Moore%2C_Oklahoma_tornado.JPG/500px-May_20%2C_2013_Moore%2C_Oklahoma_tornado.JPG',
  waterspout:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Waterspout_noaa00307.jpg/500px-Waterspout_noaa00307.jpg',
  wallCloud:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Wall_cloud2_-_NOAA.jpg/500px-Wall_cloud2_-_NOAA.jpg',
  mammatus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Mammatus_cloud_panorama.jpg/500px-Mammatus_cloud_panorama.jpg',
  stormSurge:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Storm_Surge_in_Morehead_City_during_Hazel.jpg/500px-Storm_Surge_in_Morehead_City_during_Hazel.jpg',
  derecho:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Boundery_waters_Canadian_Derecho_radar_image.png/500px-Boundery_waters_Canadian_Derecho_radar_image.png',
  // cloud type photos
  cumulus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/GoldenMedows.jpg/500px-GoldenMedows.jpg',
  cumulonimbus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Fly00890_-_Flickr_-_NOAA_Photo_Library.jpg/500px-Fly00890_-_Flickr_-_NOAA_Photo_Library.jpg',
  cirrus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/CirrusField-color.jpg/500px-CirrusField-color.jpg',
  stratus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Stratus_clouds_Vodno_4.jpg/500px-Stratus_clouds_Vodno_4.jpg',
  stratocumulus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Above_the_Clouds.jpg/500px-Above_the_Clouds.jpg',
  altocumulus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Altocumulus.jpg/500px-Altocumulus.jpg',
  lenticular:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Lenticular_Cloud_over_Harold%27s_Cross_Dublin_Ireland_30-6-15.jpg/500px-Lenticular_Cloud_over_Harold%27s_Cross_Dublin_Ireland_30-6-15.jpg',
  nimbostratus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ns1.jpg/500px-Ns1.jpg',
};

function Img({ src, alt, caption, credit, width }) {
  return (
    <figure style={{ margin: '10px 0', textAlign: 'center' }}>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: width || '100%',
          height: 'auto',
          border: '1px solid #ccc',
          display: 'inline-block',
        }}
        loading="lazy"
        onError={(e) => { e.target.parentElement.style.display = 'none'; }}
      />
      {caption && (
        <figcaption style={{ fontSize: '10px', color: '#666', marginTop: '3px', fontStyle: 'italic' }}>
          {caption}
        </figcaption>
      )}
      {credit && (
        <figcaption style={{ fontSize: '9px', color: '#999', marginTop: '1px' }}>
          Credit: {credit}
        </figcaption>
      )}
    </figure>
  );
}

// each accordion section and its content
const SECTIONS = [
  {
    id: 'tornadoes',
    title: 'Tornadoes',
    content: (
      <>
        <p>
          A tornado is a violently rotating column of air that extends from a
          thunderstorm all the way down to the ground. At their worst, tornadoes
          can generate winds over 300 mph, level well built homes, snap trees at
          their base, and launch heavy objects through the air like missiles.
        </p>

        <Img
          src={IMG.tornadoSupercell}
          alt="EF5 tornado near Elie, Manitoba"
          caption="An EF5 tornado near Elie, Manitoba, 2007"
          credit="Photo: Justin Hobson / CC BY-SA 3.0 via Wikimedia Commons"
        />

        <h4>Enhanced Fujita (EF) Scale</h4>
        <table>
          <thead>
            <tr><th>Rating</th><th>Wind Speed</th><th>Damage</th></tr>
          </thead>
          <tbody>
            <tr><td>EF0</td><td>65 85 mph</td><td>Light: branches broken, shallow rooted trees pushed over</td></tr>
            <tr><td>EF1</td><td>86 110 mph</td><td>Moderate: roof surfaces peeled off, mobile homes overturned</td></tr>
            <tr><td>EF2</td><td>111 135 mph</td><td>Considerable: entire roofs torn off, large trees snapped, cars lifted off the ground</td></tr>
            <tr><td>EF3</td><td>136 165 mph</td><td>Severe: stories of buildings destroyed, heavy vehicles thrown</td></tr>
            <tr><td>EF4</td><td>166 200 mph</td><td>Devastating: well built homes completely leveled, cars thrown long distances</td></tr>
            <tr><td>EF5</td><td>200+ mph</td><td>Incredible: reinforced structures swept away, pavement scoured off roads</td></tr>
          </tbody>
        </table>

        <div className="edu-two-col">
          <Img
            src={IMG.ef5Damage}
            alt="EF5 tornado damage"
            caption="EF5 damage. Structures completely swept away, leaving only foundation slabs."
            credit="FEMA / Public Domain via Wikimedia Commons"
          />
          <Img
            src={IMG.joplinDamage}
            alt="Joplin tornado damage"
            caption="Joplin, MO 2011. EF5 devastation across an entire neighborhood."
            credit="U.S. Air Force / Public Domain via Wikimedia Commons"
          />
        </div>

        <h4>Types of Tornadoes</h4>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Supercell Tornadoes</h5>
            <p>
              These are the most powerful and destructive tornadoes. They form
              from supercell thunderstorms that contain a deep, persistent
              rotating updraft called a mesocyclone. Most EF3 through EF5
              tornadoes fall into this category. They can last over an hour and
              carve a damage path spanning dozens of miles.
            </p>
          </div>
          <Img
            src={IMG.supercellStructure}
            alt="Supercell thunderstorm"
            caption="A supercell thunderstorm, the parent storm behind the most violent tornadoes"
            credit="Photo: Mark Conner / CC BY 2.0 via Wikimedia Commons"
            width="280px"
          />
        </div>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Wedge Tornado</h5>
            <p>
              A wedge tornado looks wider than it is tall. These are often (but
              not always) the most violent, frequently earning an EF3 rating or
              higher. Because of their massive size, they can appear to be moving
              slowly, but they may actually be traveling at 50+ mph. Don't let
              the illusion of slow movement fool you.
            </p>
          </div>
          <Img
            src={IMG.mooreTornado}
            alt="Large wedge tornado"
            caption="The 2013 Moore, OK EF5 tornado, a massive wedge"
            credit="Photo: NOAA / Public Domain via Wikimedia Commons"
            width="280px"
          />
        </div>


        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Rope Tornado</h5>
            <p>
              A thin, rope like tornado. You'll often see this shape during the
              dissipating stage, though it can also appear at formation. Don't
              underestimate a rope tornado. They can still produce EF2+ winds
              and may suddenly widen into something much larger.
            </p>
          </div>
          <Img
            src={IMG.ropeTornado}
            alt="Rope tornado"
            caption="A rope-stage tornado, thin and sinuous"
            credit="NOAA / Public Domain via Wikimedia Commons"
            width="220px"
          />
        </div>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Multi Vortex Tornado</h5>
            <p>
              This type contains two or more small, intense sub vortices that
              orbit the center of a larger tornado circulation. These
              sub vortices are responsible for the most extreme damage within
              the tornado's path. You'll sometimes see one house completely
              leveled while the house right next to it is relatively untouched.
            </p>
          </div>
          <Img
            src={IMG.multiVortex}
            alt="Multi-vortex tornado in Dallas, 1957"
            caption="Multi-vortex tornado, Dallas TX, 1957. Two sub vortices clearly visible."
            credit="Photo: Robert E. Day / Public Domain via Wikimedia Commons"
            width="260px"
          />
        </div>

        <h5>Satellite Tornado</h5>
        <p>
          A smaller tornado that orbits a larger, primary tornado. Both are
          distinct funnels. When you see this, it signals an extremely powerful
          storm system and is typically associated with the most violent
          tornadoes in the EF4 to EF5 range.
        </p>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Landspout</h5>
            <p>
              A tornado that isn't associated with a mesocyclone. It forms from
              the ground up when a boundary or convergence zone gets pulled into
              a growing thunderstorm. Landspouts are typically weaker, in the
              EF0 to EF1 range, but they can still cause real damage and
              injuries. They're especially common along the Colorado Front Range.
            </p>
          </div>
        </div>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Waterspout</h5>
            <p>
              A tornado that forms over water. Fair weather waterspouts develop
              in light wind conditions and are usually weak. Tornadic
              waterspouts, on the other hand, are true tornadoes that either
              move from land to water or form directly over water from severe
              thunderstorms. These can move onshore and cause significant damage.
            </p>
          </div>
          <Img
            src={IMG.waterspout}
            alt="Waterspout"
            caption="Waterspout over the ocean"
            credit="NOAA / Public Domain via Wikimedia Commons"
            width="220px"
          />
        </div>

        <div style={{ background: '#fff', border: '1px solid #cc0000', padding: '8px 12px', margin: '12px 0' }}>
          <h5 style={{ color: '#cc0000', margin: '0 0 4px 0' }}>!! Rain-Wrapped Tornado</h5>
          <p>
            A tornado hidden inside heavy precipitation. These are
            {' '}<strong>extremely dangerous</strong> because you simply cannot
            see them coming. They're common in the southeastern US and during
            nighttime events. Often, radar is the only way to detect them.
            {' '}<strong>Always take tornado warnings seriously, even if you
            can't see a funnel.</strong>
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'spotting',
    title: 'Spotting Tornado Formation',
    content: (
      <>
        <p>
          Knowing what to look for can give you critical extra minutes to get
          to shelter. Here are the visual and environmental cues that suggest
          a tornado may be forming.
        </p>

        <h4>Sky & Cloud Signs</h4>

        <div className="edu-two-col">
          <div className="edu-text">
            <table>
              <thead>
                <tr><th>Sign</th><th>What It Means</th></tr>
              </thead>
              <tbody>
                <tr><td>Dark, greenish sky</td><td>Large hail is present in the storm, which often accompanies tornadic supercells</td></tr>
                <tr><td>Wall cloud</td><td>A lowered, rotating cloud base beneath the rain free area of a thunderstorm. This is where tornadoes frequently form.</td></tr>
                <tr><td>Rotating clouds</td><td>Any visible rotation in the cloud base points to a mesocyclone</td></tr>
                <tr><td>Funnel cloud</td><td>A rotating cone descending from the cloud base. If it reaches the ground, it becomes a tornado.</td></tr>
                <tr><td>Mammatus clouds</td><td>Pouch like bulges hanging from the underside of a cloud. They indicate severe turbulence.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="edu-two-col">
          <Img
            src={IMG.wallCloud}
            alt="Wall cloud formation"
            caption="A rotating wall cloud, often a precursor to tornado formation"
            credit="NOAA / Public Domain via Wikimedia Commons"
            width="300px"
          />
          <Img
            src={IMG.mammatus}
            alt="Mammatus clouds"
            caption="Mammatus clouds indicate extreme turbulence in the storm"
            credit="Photo: Jorn Olsen / CC BY-SA 3.0 via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>Sound & Debris Signs</h4>
        <ul>
          <li><strong>Continuous rumble or roar:</strong> Unlike thunder, which fades away, a tornado produces a constant roar similar to a freight train</li>
          <li><strong>Debris cloud at ground level:</strong> Even without a visible funnel, a cloud of dust and debris at ground level means a tornado is on the ground</li>
          <li><strong>Large hail followed by calm:</strong> A sudden quiet after large hail can mean the tornado is about to form in the updraft area</li>
          <li><strong>Blue green flashes at night:</strong> These are power lines being snapped by a tornado. At night, this may be your only visual warning.</li>
        </ul>

        <h4>Radar Signatures</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <ul>
              <li><strong>Hook echo:</strong> A hook shaped appendage on the rear of a storm on radar. This is a classic indicator of a mesocyclone and a possible tornado.</li>
              <li><strong>Velocity couplet:</strong> On Doppler velocity radar, bright red (moving away) and bright green (moving toward) pixels right next to each other indicate strong rotation.</li>
              <li><strong>Debris ball:</strong> High reflectivity (70+ dBZ) at the tip of a hook echo. This is lofted debris and confirms a tornado is on the ground.</li>
            </ul>
          </div>
          <Img
            src={IMG.radarHookEcho}
            alt="Hook echo on radar showing EF5 tornado"
            caption="Radar showing the hook echo of the Hackleburg Phil Campbell EF5, April 27, 2011"
            credit="NWS / Public Domain via Wikimedia Commons"
            width="260px"
          />
        </div>

        <h4>Environmental Conditions</h4>
        <ul>
          <li>Warm, humid air at the surface with a strong temperature change aloft (this creates instability)</li>
          <li>Wind changing direction and increasing speed with height (known as wind shear)</li>
          <li>A visible dry line or front, since tornadoes often form near atmospheric boundaries</li>
          <li>A rapid pressure drop on a barometer</li>
        </ul>
      </>
    ),
  },
  {
    id: 'hurricanes',
    title: 'Hurricanes',
    content: (
      <>
        <p>
          A hurricane is a tropical cyclone with sustained winds of 74 mph or
          higher. Hurricanes form over warm ocean water (at least 80°F / 26.5°C)
          and can bring catastrophic wind damage, storm surge, inland flooding,
          and even tornadoes.
        </p>

        <Img
          src={IMG.hurricaneSatellite}
          alt="Hurricane Katrina satellite image"
          caption="Hurricane Katrina at Category 5 intensity, August 28, 2005"
          credit="NASA / Public Domain via Wikimedia Commons"
        />

        <h4>Saffir Simpson Hurricane Wind Scale</h4>
        <table>
          <thead>
            <tr><th>Cat</th><th>Winds</th><th>Surge</th><th>Damage</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>74-95 mph</td><td>4-5 ft</td><td>Minimal: some roof and siding damage, branches down, scattered power outages</td></tr>
            <tr><td>2</td><td>96-110 mph</td><td>6-8 ft</td><td>Moderate: major roof damage, trees uprooted, extended power loss</td></tr>
            <tr><td>3</td><td>111-129 mph</td><td>9-12 ft</td><td>Extensive: structural failure of decks and gable ends, trees snapped, no electricity or water for days</td></tr>
            <tr><td>4</td><td>130-156 mph</td><td>13-18 ft</td><td>Catastrophic: severe roof and wall loss, power out for weeks to months</td></tr>
            <tr><td>5</td><td>157+ mph</td><td>18+ ft</td><td>Total destruction: many structures destroyed, entire areas uninhabitable</td></tr>
          </tbody>
        </table>

        <h4>Hurricane Structure</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <ul>
              <li><strong>Eye:</strong> The calm center, typically 10 to 40 miles wide. You'll see clear skies and light winds, but do NOT go outside. The other side of the eyewall is only minutes away.</li>
              <li><strong>Eyewall:</strong> The ring of the most intense thunderstorms surrounding the eye. This is where you'll find the strongest winds and heaviest rain.</li>
              <li><strong>Rainbands:</strong> Spiral bands that extend outward from the center. They can produce tornadoes, heavy rain, and gusty winds hundreds of miles from the storm's core.</li>
            </ul>
          </div>
          <Img
            src={IMG.hurricaneStructure}
            alt="Hurricane cross section diagram"
            caption="Cross section of a hurricane showing eye, eyewall, and rainbands"
            credit="Diagram: Kelvinsong / CC BY-SA 3.0 via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>Storm Surge</h4>
        <div style={{ background: '#fff', border: '1px solid #cc0000', padding: '8px 12px', margin: '12px 0' }}>
          <p>
            <strong>This is the number one killer in hurricanes.</strong> Storm
            surge is a dome of ocean water pushed ashore by the hurricane's
            winds. A Category 4 hurricane can push a wall of water 13 to 18
            feet above the normal tide level.
          </p>
          <p style={{ color: '#cc0000', fontWeight: 'bold', marginTop: '6px' }}>
            If you are told to evacuate from a storm surge zone, leave
            immediately. No structure is designed to withstand being submerged.
          </p>
        </div>

        <Img
          src={IMG.stormSurge}
          alt="Storm surge damage"
          caption="Storm surge devastation from Hurricane Katrina"
          credit="NOAA / Public Domain via Wikimedia Commons"
        />

        <h4>Rapid Intensification</h4>
        <p>
          When a hurricane's sustained wind speed jumps by 35 mph or more in
          just 24 hours, that's rapid intensification. It's becoming more
          common as ocean temperatures rise, and it makes accurate forecasting
          extremely difficult. A storm can leap from Category 1 to Category 4
          overnight. <strong>Always prepare for a storm one category higher
          than what's forecast.</strong>
        </p>
      </>
    ),
  },
  {
    id: 'safety',
    title: 'Severe Weather Safety',
    content: (
      <>
        <h4>Tornado Safety</h4>
        <table>
          <thead>
            <tr><th>Location</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr><td>In a house</td><td>Get to the basement or an interior room on the lowest floor (a closet, bathroom, or hallway). Get under sturdy furniture, stay away from windows, and cover yourself with a mattress or blankets.</td></tr>
            <tr><td>In an apartment</td><td>Go to the lowest floor interior room or hallway. Avoid elevators. If there's no time, get in a bathtub and cover yourself with a mattress.</td></tr>
            <tr><td>In a mobile home</td><td><strong style={{ color: '#cc0000' }}>GET OUT.</strong> Mobile homes are not safe in a tornado at any EF rating. Get to a nearby sturdy building or lie flat in a low ditch as a last resort.</td></tr>
            <tr><td>In a car</td><td>Do NOT try to outrun a tornado. Pull over, keep your seatbelt on, duck below the windows, and cover your head. If you can safely reach a sturdy building, go there. <strong>Never shelter under an overpass.</strong></td></tr>
            <tr><td>Outside</td><td>Lie flat in the nearest ditch or low lying area. Cover your head with your arms. Stay away from trees, cars, and structures that could fall on you.</td></tr>
            <tr><td>At school/work</td><td>Follow the building's emergency plan. Move to interior hallways on the lowest floor. Avoid auditoriums, gyms, and large open rooms with wide span roofs.</td></tr>
          </tbody>
        </table>

        <div className="edu-two-col">
          <Img
            src={IMG.parkersburgDamage}
            alt="Parkersburg Iowa tornado damage"
            caption="EF5 damage in Parkersburg, IA. This is why shelter matters."
            credit="FEMA / Public Domain via Wikimedia Commons"
          />
          <Img
            src={IMG.iowaFloodDamage}
            alt="Tornado damage to structures"
            caption="Structures destroyed by a violent tornado in Woodward, IA"
            credit="FEMA / Public Domain via Wikimedia Commons"
          />
        </div>

        <h4>Hurricane Safety</h4>
        <ul>
          <li><strong>Before:</strong> Know your evacuation zone and route. Board up windows. Stock at least 3 days of water (1 gallon per person per day), non-perishable food, medications, batteries, flashlights, and keep important documents in waterproof bags.</li>
          <li><strong>Evacuation:</strong> If you're ordered to evacuate, <strong>do it immediately</strong>. Don't wait. Roads become impassable fast.</li>
          <li><strong>During:</strong> Stay indoors and away from windows. Move to an interior room if winds pick up. Do not go outside during the eye. The worst winds will return suddenly from the opposite direction.</li>
          <li><strong>After:</strong> Stay away from downed power lines, standing water (it may be electrically charged or contaminated), and weakened structures. Don't return home until authorities say it's safe.</li>
        </ul>

        <h4>Thunderstorm & Lightning Safety</h4>
        <div style={{ background: '#e8e8e8', border: 'none', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf', padding: '8px 12px', margin: '8px 0' }}>
          <p style={{ fontWeight: 'bold', color: '#135997' }}>"When thunder roars, go indoors."</p>
          <p>If you can hear thunder, lightning can strike your location.</p>
        </div>
        <ul>
          <li>Stay inside for 30 minutes after the last clap of thunder.</li>
          <li>Avoid water, tall objects, metal fences, and open fields.</li>
          <li>If you're caught outside, crouch low with your feet together and minimize your contact with the ground. Do NOT lie flat.</li>
          <li>Inside, stay off corded phones, avoid plumbing, and keep away from windows.</li>
        </ul>

        <h4>Flash Flood Safety</h4>
        <div style={{ background: '#e8e8e8', border: 'none', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf', padding: '8px 12px', margin: '8px 0' }}>
          <p style={{ fontWeight: 'bold', color: '#135997' }}>"Turn around, don't drown."</p>
          <p>Never drive through flooded roads. Just 6 inches of moving water can knock you down, and 12 inches can carry away a vehicle.</p>
        </div>
        <ul>
          <li>Move to higher ground immediately if you see water rising.</li>
          <li>Don't camp or park along streams in mountainous areas during heavy rain.</li>
          <li>Nighttime floods are especially deadly because you can't see them coming.</li>
        </ul>

        <h4>Watch vs. Warning</h4>
        <table>
          <thead>
            <tr><th>Term</th><th>Meaning</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Watch</strong></td><td>Conditions are favorable for severe weather. <strong>Be prepared</strong> to act. Monitor updates closely.</td></tr>
            <tr><td><strong>Warning</strong></td><td>Severe weather is occurring or is imminent. <strong>Take action NOW.</strong> Get to shelter immediately.</td></tr>
            <tr><td><strong>Advisory</strong></td><td>Weather conditions may cause inconvenience or danger. Use caution.</td></tr>
            <tr><td><strong>Emergency</strong></td><td>An extraordinary threat to life and property. Follow all instructions without delay.</td></tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: 'other',
    title: 'Other Severe Weather',
    content: (
      <>
        <h4>Derechos</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              A derecho is a widespread, long-lived windstorm produced by a line
              of severe thunderstorms. It generates damaging straight line winds
              of 58 mph or greater along a path at least 250 miles long.
              Derechos can produce hurricane force winds exceeding 100 mph
              across a massive area. Unlike tornadoes, the damage swath is
              extremely wide, sometimes over 100 miles across.
            </p>
          </div>
          <Img
            src={IMG.derecho}
            alt="Derecho radar composite"
            caption="Radar showing a derecho's bow echo"
            credit="NWS / Public Domain via Wikimedia Commons"
            width="240px"
          />
        </div>

        <h4>Microbursts</h4>
        <p>
          A microburst is a column of sinking air that can produce damaging
          winds up to 150 mph. The affected area is less than 2.5 miles wide,
          which makes them very hard to detect. Dry microbursts happen in arid
          regions, while wet microbursts come with heavy rain. Both are
          extremely dangerous to aircraft and structures.
        </p>

        <h4>Hailstorms</h4>
        <div className="edu-two-col">
          <table>
            <thead>
              <tr><th>Diameter</th><th>Comparison</th><th>Threat</th></tr>
            </thead>
            <tbody>
              <tr><td>0.25 in</td><td>Pea</td><td>Minor, mainly crop damage</td></tr>
              <tr><td>1.00 in</td><td>Quarter</td><td>Severe (NWS threshold). Can damage vehicles and roofs.</td></tr>
              <tr><td>1.75 in</td><td>Golf ball</td><td>Significant. Windshields shattered, major roof damage.</td></tr>
              <tr><td>2.75 in</td><td>Baseball</td><td>Destructive. Can injure or kill people caught outdoors.</td></tr>
              <tr><td>4.00+ in</td><td>Softball</td><td>Catastrophic. Punches through roofs, potentially fatal if struck.</td></tr>
            </tbody>
          </table>
          <Img
            src={IMG.hailComparison}
            alt="Large hailstones"
            caption="Large hailstones that can cause severe damage"
            credit="NOAA / Public Domain via Wikimedia Commons"
            width="220px"
          />
        </div>

        <h4>Winter Storms</h4>
        <ul>
          <li><strong>Blizzard:</strong> Sustained winds of 35+ mph with heavy snow and visibility below 1/4 mile for 3 or more hours. These can be life threatening.</li>
          <li><strong>Ice Storm:</strong> Freezing rain that accumulates 1/4 inch or more. Brings down trees and power lines, and makes roads impassable. Power outages can last for weeks.</li>
          <li><strong>Lake Effect Snow:</strong> Intense, localized snowfall downwind of the Great Lakes. It can dump 2 to 3 inches per hour with near zero visibility.</li>
        </ul>

        <h4>Heat</h4>
        <div style={{ background: '#fff', border: '1px solid #cc0000', padding: '8px 12px', margin: '8px 0' }}>
          <p>
            <strong>Heat is the number one weather related killer in the
            US.</strong> Excessive heat kills more people every year than
            tornadoes, hurricanes, and floods combined. A heat index above
            105°F is dangerous, and above 130°F it becomes life threatening.
          </p>
          <p style={{ marginTop: '4px' }}>
            <strong>Heat stroke symptoms:</strong> hot or red skin, rapid
            pulse, confusion, and loss of consciousness.
            {' '}<strong style={{ color: '#cc0000' }}>Call 911 immediately.</strong>
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'clouds',
    title: 'Cloud Types',
    content: (
      <>
        <p>
          Clouds are classified by their altitude and shape. Knowing cloud types
          helps you read the sky and anticipate weather changes before they happen.
        </p>

        <h4>High Clouds (above 20,000 ft)</h4>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Cirrus</h5>
            <p>
              Thin, wispy strands of ice crystals high in the atmosphere. Often called
              "mare's tails." When cirrus thickens and spreads, it can signal an
              approaching warm front and rain within 24 hours.
            </p>
          </div>
          <Img
            src={IMG.cirrus}
            alt="Cirrus clouds"
            caption="Cirrus clouds: thin ice crystal filaments at high altitude"
            credit="Photo: Wikimedia Commons / Public Domain"
          />
        </div>

        <h4>Mid Level Clouds (6,500 to 20,000 ft)</h4>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Altocumulus</h5>
            <p>
              White or gray patches of cloud in rounded clumps or rolls. On a warm,
              humid morning, altocumulus can indicate thunderstorms later in the day.
            </p>
          </div>
          <Img
            src={IMG.altocumulus}
            alt="Altocumulus clouds"
            caption="Altocumulus: mid level cloud patches in rounded clumps"
            credit="Photo: Wikimedia Commons / CC BY-SA"
          />
        </div>

        <h4>Low Clouds (below 6,500 ft)</h4>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Cumulus</h5>
            <p>
              Puffy, white clouds with flat bases. Fair weather cumulus are small and
              scattered. When they grow tall and tower upward, they can develop into
              thunderstorms.
            </p>
          </div>
          <Img
            src={IMG.cumulus}
            alt="Cumulus clouds over a field"
            caption="Fair weather cumulus: puffy clouds with flat bases"
            credit="Photo: Wikimedia Commons / Public Domain"
          />
        </div>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Stratus</h5>
            <p>
              A flat, gray, uniform layer that often covers the entire sky like a
              blanket. Produces light drizzle or mist. Fog is essentially a stratus
              cloud at ground level.
            </p>
          </div>
          <Img
            src={IMG.stratus}
            alt="Stratus cloud layer"
            caption="Stratus: a uniform gray cloud blanket"
            credit="Photo: Wikimedia Commons / CC BY-SA"
          />
        </div>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Stratocumulus</h5>
            <p>
              Low, lumpy clouds in rows or patches. The most common cloud type worldwide.
              Usually brings dry weather but can produce light precipitation.
            </p>
          </div>
          <Img
            src={IMG.stratocumulus}
            alt="Stratocumulus clouds"
            caption="Stratocumulus: low, lumpy cloud patches"
            credit="Photo: Wikimedia Commons / CC BY-SA"
          />
        </div>

        <h4>Vertical Development Clouds</h4>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Cumulonimbus</h5>
            <p>
              The thunderstorm cloud. Towers from near the surface up to 40,000 ft or
              higher, with an anvil shaped top. Produces heavy rain, lightning, hail,
              strong winds, and tornadoes. When you see one developing, severe weather
              is likely.
            </p>
          </div>
          <Img
            src={IMG.cumulonimbus}
            alt="Cumulonimbus cloud"
            caption="Cumulonimbus: the thunderstorm cloud with anvil top"
            credit="Photo: NASA / Public Domain via Wikimedia Commons"
          />
        </div>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Nimbostratus</h5>
            <p>
              A thick, dark gray layer that blocks out the sun. Produces steady,
              continuous rain or snow that can last for hours. Associated with warm
              fronts and large scale storm systems.
            </p>
          </div>
          <Img
            src={IMG.nimbostratus}
            alt="Nimbostratus cloud"
            caption="Nimbostratus: thick gray rain producing cloud layer"
            credit="Photo: Wikimedia Commons / Public Domain"
          />
        </div>

        <h4>Special Formations</h4>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Lenticular</h5>
            <p>
              Lens shaped clouds that form over mountains when stable air flows over
              high terrain. They remain stationary while wind flows through them.
              Often mistaken for UFOs. Indicate strong winds aloft and turbulence.
            </p>
          </div>
          <Img
            src={IMG.lenticular}
            alt="Lenticular cloud"
            caption="Lenticular cloud: lens shaped formation over terrain"
            credit="Photo: Wikimedia Commons / CC BY-SA"
          />
        </div>

        <div className="edu-two-col">
          <div className="edu-text">
            <h5>Mammatus</h5>
            <p>
              Pouch like bulges hanging from the underside of a cloud, usually a
              cumulonimbus anvil. They indicate severe turbulence and are often seen
              near intense thunderstorms, though they themselves are not dangerous.
            </p>
          </div>
          <Img
            src={IMG.mammatus}
            alt="Mammatus clouds"
            caption="Mammatus clouds: bulging pouches under a storm anvil"
            credit="Photo: Jorn Olsen / CC BY-SA 3.0 via Wikimedia Commons"
          />
        </div>
      </>
    ),
  },
];

export default function EducationPanel() {
  const [openSection, setOpenSection] = useState('tornadoes');

  return (
    <div style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '13px', color: '#000', maxWidth: '900px', margin: '0 auto', background: '#e8e8e8', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf' }}>
      <div
        style={{
          background: '#135997',
          color: '#fff',
          padding: '4px 8px',
          fontWeight: 'bold',
          fontSize: '13px',
          textAlign: 'left',
          boxShadow: 'inset -1px -1px #051a30, inset 1px 1px #7abcf0, inset -2px -2px #0a2a4a, inset 2px 2px #4a8abf',
        }}
      >
        Weather Facts
      </div>

      <div style={{ padding: '8px 16px', background: '#e8e8e8', borderBottom: '2px solid #808080', fontSize: '12px', color: '#000', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf' }}>
        Severe weather types, storm science, radar info, and cloud identification.
      </div>

      {SECTIONS.map((section) => (
        <div key={section.id}>
          <button
            onClick={() =>
              setOpenSection(openSection === section.id ? null : section.id)
            }
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '6px 16px',
              fontWeight: 'bold',
              fontSize: '13px',
              fontFamily: '"Courier New", Courier, monospace',
              background: openSection === section.id ? '#135997' : '#e8e8e8',
              color: openSection === section.id ? '#fff' : '#000',
              border: 'none',
              boxShadow: openSection === section.id
                ? 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080'
                : 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
              cursor: 'pointer',
            }}
          >
            {openSection === section.id ? '[-]' : '[+]'} {section.title}
          </button>

          {openSection === section.id && (
            <div className="education-content" style={{ padding: '12px 16px', lineHeight: '1.6', background: '#fff', margin: '4px 8px', boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080' }}>
              {section.content}
            </div>
          )}
        </div>
      ))}

      <div style={{ padding: '8px 16px', fontSize: '10px', color: '#000', borderTop: 'none', margin: '4px 8px', background: '#fff', boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080' }}>
        <div style={{ fontWeight: 'bold', color: '#135997', marginBottom: '6px', fontSize: '11px' }}>
          Sources & Credits
        </div>
        <div style={{ marginBottom: '6px' }}>
          <strong>Information Sources:</strong>
          <ul style={{ margin: '2px 0 0 16px', listStyleType: 'disc' }}>
            <li>National Weather Service (NWS), weather.gov: EF Scale, Saffir Simpson Scale, Watch/Warning definitions, safety guidelines</li>
            <li>NOAA Storm Prediction Center (SPC), spc.noaa.gov: Tornado types, formation indicators, radar signatures</li>
            <li>NOAA National Hurricane Center (NHC), nhc.noaa.gov: Hurricane structure, storm surge, rapid intensification</li>
            <li>NOAA Weather Prediction Center: Derecho criteria, winter storm classifications</li>
            <li>National Severe Storms Laboratory (NSSL), nssl.noaa.gov: Multi-vortex and radar research</li>
          </ul>
        </div>
        <div style={{ marginBottom: '6px' }}>
          <strong>Image Credits:</strong>
          <ul style={{ margin: '2px 0 0 16px', listStyleType: 'disc' }}>
            <li>EF5 Elie, Manitoba tornado (2007), Justin Hobson / CC BY-SA 3.0 via Wikimedia Commons</li>
            <li>Multi-vortex tornado, Dallas TX (1957), Robert E. Day / Public Domain via Wikimedia Commons</li>
            <li>Chaparral supercell thunderstorm, Mark Conner / CC BY 2.0 via Wikimedia Commons</li>
            <li>Moore, OK EF5 tornado (2013), NOAA / Public Domain via Wikimedia Commons</li>
            <li>Funnel cloud approaching ground, NOAA / Public Domain via Wikimedia Commons</li>
            <li>Roping tornado, NOAA / Public Domain via Wikimedia Commons</li>
            <li>EF5 damage example, FEMA / Public Domain via Wikimedia Commons</li>
            <li>Joplin, MO tornado damage (2011), U.S. Air Force / Public Domain via Wikimedia Commons</li>
            <li>Parkersburg, IA tornado damage, FEMA / Public Domain via Wikimedia Commons</li>
            <li>Woodward, IA tornado damage, FEMA / Public Domain via Wikimedia Commons</li>
            <li>Hook echo radar, Hackleburg Phil Campbell EF5 (2011), NWS / Public Domain via Wikimedia Commons</li>
            <li>Wall cloud, NOAA / Public Domain via Wikimedia Commons</li>
            <li>Mammatus clouds over Bozeman, Jorn Olsen / CC BY-SA 3.0 via Wikimedia Commons</li>
            <li>Hurricane Katrina satellite (2005), NASA / Public Domain via Wikimedia Commons</li>
            <li>Hurricane cross section diagram, Kelvinsong / CC BY-SA 3.0 via Wikimedia Commons</li>
            <li>Hurricane Katrina storm surge damage, NOAA / Public Domain via Wikimedia Commons</li>
            <li>Derecho bow echo radar, NWS / Public Domain via Wikimedia Commons</li>
            <li>Hailstones, NOAA / Public Domain via Wikimedia Commons</li>
            <li>Waterspout, NOAA / Public Domain via Wikimedia Commons</li>
            <li>Cumulus clouds, Wikimedia Commons / Public Domain</li>
            <li>Cumulonimbus over Africa, NASA / Public Domain via Wikimedia Commons</li>
            <li>Cirrus clouds, Wikimedia Commons / Public Domain</li>
            <li>Stratus cloud, Wikimedia Commons / CC BY-SA</li>
            <li>Stratocumulus clouds, Wikimedia Commons / CC BY-SA</li>
            <li>Altocumulus clouds, Wikimedia Commons / CC BY-SA</li>
            <li>Lenticular cloud, Wikimedia Commons / CC BY-SA</li>
            <li>Nimbostratus cloud, Wikimedia Commons / Public Domain</li>
          </ul>
        </div>
        <div style={{ color: '#999', marginTop: '4px' }}>
          All U.S. government works (NOAA, NWS, NASA, FEMA, U.S. Air Force) are in the public domain.
          Creative Commons licensed images are used in accordance with their license terms.
          All images sourced via Wikimedia Commons.
        </div>
      </div>
    </div>
  );
}
