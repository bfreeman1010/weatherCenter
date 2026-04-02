import React, { useState } from 'react';

// all public domain images via Wikimedia Commons
const IMG = {
  superOutbreak1974:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/1974_Super_Outbreak_map.png/500px-1974_Super_Outbreak_map.png',
  superOutbreak2011:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/April_25-28%2C_2011_tornado_outbreak_map.png/500px-April_25-28%2C_2011_tornado_outbreak_map.png',
  joplin2011:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Joplin_tornado_damage.jpg/500px-Joplin_tornado_damage.jpg',
  moore2013:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/May_20%2C_2013_Moore%2C_Oklahoma_tornado.JPG/500px-May_20%2C_2013_Moore%2C_Oklahoma_tornado.JPG',
  katrina2005:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Hurricane_Katrina_August_28_2005_NASA.jpg/500px-Hurricane_Katrina_August_28_2005_NASA.jpg',
  katrinaDamage:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/FEMA_-_14944_-_Photograph_by_Jocelyn_Augustino_taken_on_08-30-2005_in_Louisiana.jpg/500px-FEMA_-_14944_-_Photograph_by_Jocelyn_Augustino_taken_on_08-30-2005_in_Louisiana.jpg',
  harvey2017:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Harvey_2017-08-25_2231Z.jpg/500px-Harvey_2017-08-25_2231Z.jpg',
  michael2018:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Michael_2018-10-10_1745Z_%28closeup%29.jpg/500px-Michael_2018-10-10_1745Z_%28closeup%29.jpg',
  triStateRoute:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Tri State_Tornado_damage_Murphysboro_Illinois.jpg/500px-Tri State_Tornado_damage_Murphysboro_Illinois.jpg',
  galveston1900:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Galveston_Hurricane_1900.jpg/500px-Galveston_Hurricane_1900.jpg',
  derecho2012:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/June_2012_North_American_derecho_composite.jpg/500px-June_2012_North_American_derecho_composite.jpg',
  andrewDamage:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Andrew_damage_Homestead.jpg/500px-Andrew_damage_Homestead.jpg',
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
          border: 'none', boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080',
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

// accordion sections
const SECTIONS = [
  {
    id: 'tornado-outbreaks',
    title: 'Historic Tornado Outbreaks',
    content: (
      <>
        <h4>Tri State Tornado: March 18, 1925</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              The deadliest single tornado in U.S. history. It traveled 219 miles
              across Missouri, Illinois, and Indiana in 3.5 hours, killing 695
              people and injuring over 2,000. The tornado was estimated at F5
              intensity with a path up to 1 mile wide.
            </p>
            <ul>
              <li><strong>Path length:</strong> 219 miles (longest on record)</li>
              <li><strong>Duration:</strong> ~3.5 hours</li>
              <li><strong>Speed:</strong> 60-73 mph forward motion</li>
              <li><strong>Deaths:</strong> 695 (single tornado record)</li>
              <li>Murphysboro, IL lost 234 people: deadliest single city toll</li>
            </ul>
          </div>
          <Img
            src={IMG.triStateRoute}
            alt="Tri State tornado damage in Murphysboro"
            caption="Devastation in Murphysboro, IL after the Tri State Tornado"
            credit="NOAA / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>Super Outbreak: April 3-4, 1974</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              One of the most prolific tornado outbreaks ever recorded. In just 18
              hours, 148 tornadoes struck 13 states from Alabama to Michigan. Six
              of those tornadoes were rated F5: more F5s in a single outbreak than
              any other in history.
            </p>
            <ul>
              <li><strong>Tornadoes:</strong> 148 confirmed</li>
              <li><strong>F5 tornadoes:</strong> 6 (unprecedented)</li>
              <li><strong>Deaths:</strong> 315</li>
              <li><strong>Injuries:</strong> 5,484</li>
              <li>Xenia, OH was nearly destroyed by an F5 tornado</li>
              <li>Led to major improvements in NWS tornado warning systems</li>
            </ul>
          </div>
          <Img
            src={IMG.superOutbreak1974}
            alt="1974 Super Outbreak tornado track map"
            caption="Track map of the 148 tornadoes during the 1974 Super Outbreak"
            credit="NWS / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>April 25-28, 2011 Super Outbreak</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              The largest tornado outbreak ever recorded. Over 4 days, 360 tornadoes
              struck the southeastern and eastern United States. April 27 alone saw
              211 tornadoes: the most in a single day in U.S. history. Four EF5
              tornadoes were confirmed that day.
            </p>
            <ul>
              <li><strong>Tornadoes:</strong> 360 over 4 days</li>
              <li><strong>EF5 tornadoes:</strong> 4 on April 27 alone</li>
              <li><strong>Deaths:</strong> 324 (April 27: 316)</li>
              <li>Hackleburg Phil Campbell, AL: EF5, 132 miles, 72 dead</li>
              <li>Smithville, MS: EF5, ground level debris completely scoured</li>
              <li>Tuscaloosa Birmingham, AL: EF4, massive wedge through urban areas</li>
            </ul>
          </div>
          <Img
            src={IMG.superOutbreak2011}
            alt="2011 Super Outbreak tornado track map"
            caption="Tornado tracks from April 25-28, 2011: 360 tornadoes across the Southeast"
            credit="NWS / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>Joplin, Missouri: May 22, 2011</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              An EF5 tornado struck Joplin, Missouri, killing 158 people: the
              deadliest single tornado since 1947. The tornado was up to 1 mile
              wide and produced 200+ mph winds. St. John's Regional Medical Center
              took a direct hit while full of patients. The tornado also destroyed
              an estimated 8,000 structures.
            </p>
            <ul>
              <li><strong>Rating:</strong> EF5 (200+ mph)</li>
              <li><strong>Path width:</strong> up to 1 mile</li>
              <li><strong>Deaths:</strong> 158</li>
              <li><strong>Injuries:</strong> 1,150+</li>
              <li><strong>Cost:</strong> $2.8 billion (2011 dollars)</li>
              <li>Led to improvements in warning messaging and public response</li>
            </ul>
          </div>
          <Img
            src={IMG.joplin2011}
            alt="Joplin tornado damage"
            caption="Devastation in Joplin, MO after the EF5 tornado, May 2011"
            credit="U.S. Air Force / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>Moore, Oklahoma: May 20, 2013</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              An EF5 tornado struck Moore for the third time in 14 years (also
              hit in 1999 and 2003). The 2013 tornado killed 24 people and caused
              $2 billion in damage. Plaza Towers Elementary School collapsed with
              students inside, killing 7 children.
            </p>
            <ul>
              <li><strong>Rating:</strong> EF5 (210 mph)</li>
              <li><strong>Path:</strong> 17 miles long, 1.3 miles wide</li>
              <li><strong>Deaths:</strong> 24</li>
              <li>Renewed push for storm shelters in schools</li>
              <li>Moore had also been hit by an F5 on May 3, 1999 (301 mph measured wind)</li>
            </ul>
          </div>
          <Img
            src={IMG.moore2013}
            alt="2013 Moore EF5 tornado"
            caption="The 2013 Moore, OK EF5 tornado bearing down on the city"
            credit="NOAA / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>
      </>
    ),
  },
  {
    id: 'hurricanes',
    title: 'Historic Hurricanes',
    content: (
      <>
        <h4>Galveston Hurricane: September 8, 1900</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              The deadliest natural disaster in U.S. history. A Category 4 hurricane
              struck Galveston, Texas, a barrier island city with no seawall and a
              maximum elevation of 8.7 feet. The storm surge of 8-15 feet covered
              the entire island. An estimated 6,000-12,000 people were killed.
            </p>
            <ul>
              <li><strong>Category:</strong> 4 (estimated 145 mph)</li>
              <li><strong>Storm surge:</strong> 8-15 feet (island max elevation: 8.7 ft)</li>
              <li><strong>Deaths:</strong> 6,000-12,000</li>
              <li>Led to construction of the Galveston Seawall and grade raising</li>
              <li>Prompted creation of a national weather warning system</li>
            </ul>
          </div>
          <Img
            src={IMG.galveston1900}
            alt="Galveston 1900 hurricane damage"
            caption="Aftermath of the 1900 Galveston Hurricane: entire city devastated"
            credit="Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>Hurricane Andrew: August 24, 1992</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              A compact but intense Category 5 hurricane that struck Homestead,
              Florida with 165 mph sustained winds. Andrew destroyed 63,500 homes
              and damaged 124,000 more. It exposed serious flaws in South Florida
              building codes and reshaped emergency management.
            </p>
            <ul>
              <li><strong>Category:</strong> 5 at landfall (165 mph)</li>
              <li><strong>Deaths:</strong> 65 (US)</li>
              <li><strong>Cost:</strong> $27 billion (1992) / ~$55 billion adjusted</li>
              <li>Nearly bankrupted the Florida insurance industry</li>
              <li>Led to creation of FEMA as a cabinet level agency</li>
              <li>Building codes completely overhauled afterward</li>
            </ul>
          </div>
          <Img
            src={IMG.andrewDamage}
            alt="Hurricane Andrew damage in Homestead FL"
            caption="Neighborhood in Homestead, FL destroyed by Hurricane Andrew"
            credit="NOAA / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>Hurricane Katrina: August 29, 2005</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              The costliest and one of the deadliest hurricanes in U.S. history.
              Katrina made landfall as a Category 3 near Buras, LA, but the storm
              surge of 25-28 feet devastated the Mississippi coast. The levee system
              in New Orleans failed, flooding 80% of the city.
            </p>
            <ul>
              <li><strong>Category:</strong> 5 at peak (175 mph), Cat 3 at landfall</li>
              <li><strong>Storm surge:</strong> 25-28 feet (Mississippi coast)</li>
              <li><strong>Deaths:</strong> 1,833</li>
              <li><strong>Cost:</strong> $125 billion (2005) / $190+ billion adjusted</li>
              <li>80% of New Orleans flooded from levee failures</li>
              <li>Led to complete overhaul of levee system ($14.5 billion)</li>
            </ul>
          </div>
          <Img
            src={IMG.katrina2005}
            alt="Hurricane Katrina satellite image"
            caption="Hurricane Katrina at peak Category 5 intensity, August 28, 2005"
            credit="NASA / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>
        <Img
          src={IMG.katrinaDamage}
          alt="Hurricane Katrina flooding in Louisiana"
          caption="Flooding in Louisiana after Hurricane Katrina's storm surge and levee failures"
          credit="FEMA / Jocelyn Augustino / Public Domain via Wikimedia Commons"
        />

        <h4>Hurricane Harvey: August 25, 2017</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              Harvey made landfall as a Category 4 hurricane near Rockport, TX, then
              stalled over southeast Texas for days, dropping unprecedented rainfall.
              Some areas received over 60 inches of rain: the most from a single
              storm in U.S. history. Houston experienced catastrophic flooding.
            </p>
            <ul>
              <li><strong>Category:</strong> 4 at landfall (130 mph)</li>
              <li><strong>Rainfall:</strong> 60.58 inches maximum (Nederland, TX)</li>
              <li><strong>Deaths:</strong> 68 (direct)</li>
              <li><strong>Cost:</strong> $125 billion</li>
              <li>Over 300,000 structures flooded in Harris County</li>
              <li>Demonstrated that inland flooding, not wind, is often the deadliest hazard</li>
            </ul>
          </div>
          <Img
            src={IMG.harvey2017}
            alt="Hurricane Harvey satellite view"
            caption="Hurricane Harvey approaching the Texas coast, August 2017"
            credit="NOAA / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>Hurricane Michael: October 10, 2018</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              The strongest hurricane to make landfall on the Florida Panhandle and
              the first Category 5 to strike the contiguous US since Andrew in 1992.
              Michael rapidly intensified from Category 2 to Category 5 in just 24
              hours before devastating Mexico Beach, FL.
            </p>
            <ul>
              <li><strong>Category:</strong> 5 at landfall (160 mph)</li>
              <li><strong>Storm surge:</strong> 9-14 feet at Mexico Beach</li>
              <li><strong>Deaths:</strong> 74 (US)</li>
              <li><strong>Cost:</strong> $25 billion</li>
              <li>Mexico Beach nearly wiped off the map</li>
              <li>Textbook example of rapid intensification catching people off guard</li>
            </ul>
          </div>
          <Img
            src={IMG.michael2018}
            alt="Hurricane Michael satellite closeup"
            caption="Hurricane Michael's well defined eye at Category 5 intensity"
            credit="NOAA / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>
      </>
    ),
  },
  {
    id: 'derechos',
    title: 'Historic Derechos & Other Events',
    content: (
      <>
        <h4>June 29, 2012 Derecho</h4>
        <div className="edu-two-col">
          <div className="edu-text">
            <p>
              One of the most destructive and fastest moving derechos on record.
              It traveled from Iowa to the Mid Atlantic coast in about 12 hours,
              producing widespread 60-90 mph winds with localized gusts exceeding
              100 mph. The derecho knocked out power to 4.2 million customers and
              caused 22 deaths.
            </p>
            <ul>
              <li><strong>Path:</strong> ~700 miles (Iowa to Virginia)</li>
              <li><strong>Max winds:</strong> 91 mph measured; estimated higher</li>
              <li><strong>Deaths:</strong> 22</li>
              <li><strong>Power outages:</strong> 4.2 million customers</li>
              <li>Occurred during an extreme heat wave, making outages dangerous</li>
              <li>Some areas without power for over a week in 100°F+ heat</li>
            </ul>
          </div>
          <Img
            src={IMG.derecho2012}
            alt="2012 derecho radar composite"
            caption="Radar composite of the June 2012 derecho racing across the eastern US"
            credit="NWS / Public Domain via Wikimedia Commons"
            width="300px"
          />
        </div>

        <h4>August 10, 2020 Midwest Derecho</h4>
        <p>
          A devastating derecho struck Iowa and surrounding states with sustained
          winds of 100-140 mph. The derecho traveled 770 miles in 14 hours and
          caused an estimated $11 billion in damage: the costliest thunderstorm
          event in U.S. history. It destroyed millions of acres of crops and
          flattened entire neighborhoods in Cedar Rapids, Iowa.
        </p>
        <ul>
          <li><strong>Max winds:</strong> 140 mph (near Marshalltown, IA)</li>
          <li><strong>Deaths:</strong> 4</li>
          <li><strong>Cost:</strong> $11 billion (costliest thunderstorm ever)</li>
          <li>Damaged 90% of structures in Cedar Rapids</li>
          <li>Destroyed 10+ million acres of Iowa corn and soybeans</li>
        </ul>

        <h4>1993 Storm of the Century</h4>
        <p>
          A massive cyclone in March 1993 that produced blizzard conditions from
          Alabama to Maine, hurricane force winds along the eastern seaboard,
          record-low barometric pressure, and tornadoes in Florida. Every major
          airport on the East Coast was closed simultaneously. Snowfall totals
          exceeded 3 feet in many Appalachian locations.
        </p>
        <ul>
          <li><strong>Central pressure:</strong> 960 mb (equivalent to a Category 3 hurricane)</li>
          <li><strong>Snowfall:</strong> Up to 56 inches in the mountains</li>
          <li><strong>Deaths:</strong> 318</li>
          <li>6 inches of snow fell in Birmingham, AL; 4 inches in the Florida Panhandle</li>
          <li>60 mph thunderstorm snow squalls from Louisiana to the Carolinas</li>
        </ul>

        <h4>Super Tuesday Outbreak: February 5-6, 2008</h4>
        <p>
          An outbreak of 87 tornadoes across the southern US during the early
          morning hours on Super Tuesday. The timing (1:00-6:00 AM) made this
          outbreak particularly deadly because most victims were asleep. 57 people
          were killed, many in mobile homes.
        </p>
        <ul>
          <li><strong>Tornadoes:</strong> 87</li>
          <li><strong>Deaths:</strong> 57</li>
          <li>Most tornadoes occurred between 1:00 AM and 6:00 AM</li>
          <li>Demonstrated the extreme danger of nocturnal tornadoes</li>
          <li>Led to push for Weather Radio and phone based alerts for nighttime warnings</li>
        </ul>

        <h4>Lessons Learned</h4>
        <div style={{ background: '#e8e8e8', border: 'none', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf', padding: '8px 12px', margin: '8px 0' }}>
          <p style={{ fontWeight: 'bold', color: '#135997', marginBottom: '4px' }}>
            What history teaches us:
          </p>
          <ul>
            <li><strong>Warning lead time saves lives</strong>: The 1925 Tri State had zero warning; modern systems give 10 15+ minute lead times</li>
            <li><strong>Building codes matter</strong>: Andrew (1992) exposed fatal construction flaws that were then fixed</li>
            <li><strong>Night events are deadlier</strong>: Have a NOAA Weather Radio or phone alerts for overnight warnings</li>
            <li><strong>Evacuate when told</strong>: Katrina proved that staying in a surge zone is often fatal</li>
            <li><strong>Rapid intensification is the new normal</strong>: Michael (2018) jumped from Cat 2 to Cat 5 in 24 hours</li>
            <li><strong>Inland flooding kills more than wind</strong>: Harvey (2017) showed rainfall can be the primary threat</li>
          </ul>
        </div>
      </>
    ),
  },
];

export default function HistoricalStorms() {
  const [openSection, setOpenSection] = useState('tornado-outbreaks');

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
        Historical Storms & Events
      </div>

      <div style={{ padding: '8px 16px', background: '#e8e8e8', borderBottom: '2px solid #808080', fontSize: '12px', color: '#000', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf' }}>
        Notable severe weather events that shaped our understanding, warning systems, and preparedness.
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
            <li>National Weather Service (NWS) : weather.gov : Storm histories, damage surveys, and statistics</li>
            <li>NOAA Storm Prediction Center (SPC) : spc.noaa.gov : Tornado outbreak data and records</li>
            <li>NOAA National Hurricane Center (NHC) : nhc.noaa.gov : Hurricane track and intensity data</li>
            <li>NOAA Historical Hurricane Tracks : coast.noaa.gov/hurricanes : Historical storm data</li>
            <li>FEMA : fema.gov : Damage reports, cost estimates, and response documentation</li>
          </ul>
        </div>
        <div style={{ marginBottom: '6px' }}>
          <strong>Image Credits:</strong>
          <ul style={{ margin: '2px 0 0 16px', listStyleType: 'disc' }}>
            <li>Tri State Tornado damage, Murphysboro, IL (1925) : NOAA / Public Domain via Wikimedia Commons</li>
            <li>1974 Super Outbreak tornado track map : NWS / Public Domain via Wikimedia Commons</li>
            <li>2011 Super Outbreak tornado track map : NWS / Public Domain via Wikimedia Commons</li>
            <li>Joplin, MO tornado damage (2011) : U.S. Air Force / Public Domain via Wikimedia Commons</li>
            <li>Moore, OK EF5 tornado (2013) : NOAA / Public Domain via Wikimedia Commons</li>
            <li>Galveston Hurricane aftermath (1900) : Public Domain via Wikimedia Commons</li>
            <li>Hurricane Andrew damage, Homestead FL (1992) : NOAA / Public Domain via Wikimedia Commons</li>
            <li>Hurricane Katrina satellite (2005) : NASA / Public Domain via Wikimedia Commons</li>
            <li>Hurricane Katrina flooding, Louisiana : FEMA / Jocelyn Augustino / Public Domain via Wikimedia Commons</li>
            <li>Hurricane Harvey satellite (2017) : NOAA / Public Domain via Wikimedia Commons</li>
            <li>Hurricane Michael satellite (2018) : NOAA / Public Domain via Wikimedia Commons</li>
            <li>2012 Derecho radar composite : NWS / Public Domain via Wikimedia Commons</li>
          </ul>
        </div>
        <div style={{ color: '#999', marginTop: '4px' }}>
          All U.S. government works (NOAA, NWS, NASA, FEMA, U.S. Air Force) are in the public domain.
          All images sourced via Wikimedia Commons.
        </div>
      </div>
    </div>
  );
}
