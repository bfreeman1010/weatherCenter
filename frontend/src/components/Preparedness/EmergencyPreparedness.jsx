import React, { useState } from 'react';

// accordion sections
const SECTIONS = [
  {
    id: 'kit',
    title: 'Emergency Supply Kit',
    content: (
      <>
        <p>
          Every household should have an emergency kit ready to go. FEMA recommends
          supplies for at least <strong>72 hours (3 days)</strong>, though 7 days
          is better for major events like hurricanes.
        </p>

        <h4>Essential Supplies</h4>
        <table>
          <thead>
            <tr><th>Item</th><th>Amount</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td>Water</td><td>1 gallon/person/day</td><td>Minimum 3 day supply; also for pets</td></tr>
            <tr><td>Non perishable food</td><td>3 day supply</td><td>Canned goods, energy bars, peanut butter, dried fruit</td></tr>
            <tr><td>Manual can opener</td><td>1</td><td>Electric openers won't work without power</td></tr>
            <tr><td>Flashlights</td><td>1 per person</td><td>LED preferred; avoid candles (fire risk)</td></tr>
            <tr><td>Batteries</td><td>Extra set for each device</td><td>Store separately to prevent corrosion</td></tr>
            <tr><td>NOAA Weather Radio</td><td>1</td><td>Battery or hand crank powered; <strong>critical for night alerts</strong></td></tr>
            <tr><td>First aid kit</td><td>1</td><td>Include prescription medications (7-day supply minimum)</td></tr>
            <tr><td>Phone charger</td><td>Portable battery bank</td><td>Keep fully charged; consider solar charger</td></tr>
            <tr><td>Cash</td><td>Small bills</td><td>ATMs and card readers won't work without power</td></tr>
            <tr><td>Important documents</td><td>Copies in waterproof bag</td><td>Insurance, ID, medical records, emergency contacts</td></tr>
            <tr><td>Whistle</td><td>1 per person</td><td>To signal for help if trapped under debris</td></tr>
          </tbody>
        </table>

        <h4>Additional Items to Consider</h4>
        <ul>
          <li><strong>Infant supplies:</strong> Formula, diapers, wipes, bottles</li>
          <li><strong>Pet supplies:</strong> Food, water, medications, carrier, leash, vaccination records</li>
          <li><strong>Tools:</strong> Wrench or pliers (to turn off utilities), duct tape, plastic sheeting</li>
          <li><strong>Hygiene:</strong> Moist towelettes, garbage bags, personal sanitation supplies</li>
          <li><strong>Clothing:</strong> Complete change of clothes and sturdy shoes per person</li>
          <li><strong>Sleeping:</strong> Sleeping bags or warm blankets</li>
          <li><strong>Entertainment:</strong> Books, cards, games (especially for children)</li>
          <li><strong>Maps:</strong> Local area maps (GPS may not work)</li>
        </ul>

        <div style={{ background: '#e8e8e8', border: 'none', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf', padding: '8px 12px', margin: '8px 0' }}>
          <p style={{ fontWeight: 'bold', color: '#135997' }}>
            Kit Maintenance
          </p>
          <ul>
            <li>Check and refresh supplies every 6 months</li>
            <li>Replace expired food, water, medications, and batteries</li>
            <li>Update documents when information changes</li>
            <li>Store kit in an easily accessible, portable container</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'plan',
    title: 'Family Communication Plan',
    content: (
      <>
        <p>
          During a disaster, cell networks may be overwhelmed. Having a plan
          <strong> before </strong> an emergency means everyone knows what to do
          and where to go.
        </p>

        <h4>Create Your Plan</h4>
        <table>
          <thead>
            <tr><th>Step</th><th>Details</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Meeting places</strong></td>
              <td>
                Choose two locations:<br />
                &bull; Near your home (mailbox, big tree) for fire/tornado<br />
                &bull; Outside your neighborhood (library, church) if you cannot return home
              </td>
            </tr>
            <tr>
              <td><strong>2. Out of area contact</strong></td>
              <td>
                Pick a friend or relative in another state. Long distance calls may go through
                when local calls cannot. Everyone calls the same person to check in.
              </td>
            </tr>
            <tr>
              <td><strong>3. Emergency contacts card</strong></td>
              <td>
                Each family member carries a card with: meeting places, out of area contact number,
                local emergency numbers, medical info, and insurance policy numbers.
              </td>
            </tr>
            <tr>
              <td><strong>4. School/work plans</strong></td>
              <td>
                Know each school's and workplace's emergency procedures.
                Know who is authorized to pick up children.
              </td>
            </tr>
            <tr>
              <td><strong>5. Practice</strong></td>
              <td>
                Run through the plan twice a year. Practice tornado drills (getting to shelter
                in under 2 minutes), fire drills, and communication check ins.
              </td>
            </tr>
          </tbody>
        </table>

        <h4>Communication Tips</h4>
        <ul>
          <li><strong>Text before calling</strong>: texts use less bandwidth and are more likely to go through</li>
          <li><strong>Use social media check in features</strong>: Facebook Safety Check, etc.</li>
          <li><strong>Keep phones charged</strong>: put phone in low power mode during emergencies</li>
          <li><strong>Designate a group text</strong>: one thread for the whole family to update</li>
          <li><strong>Know your local EAS stations</strong>: local AM/FM radio stations that carry Emergency Alert System</li>
        </ul>
      </>
    ),
  },
  {
    id: 'shelter',
    title: 'Shelter & Safe Rooms',
    content: (
      <>
        <h4>Tornado Safe Rooms</h4>
        <p>
          A safe room is a hardened structure specifically designed to withstand
          extreme winds and flying debris from tornadoes and hurricanes. FEMA
          standards (P-320 and P-361) specify construction requirements.
        </p>

        <table>
          <thead>
            <tr><th>Type</th><th>Description</th><th>Cost Range</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Underground shelter</td>
              <td>Below ground concrete or fiberglass unit in the garage or yard. Best tornado protection.</td>
              <td>$3,000-$8,000</td>
            </tr>
            <tr>
              <td>Above ground safe room</td>
              <td>Reinforced concrete or steel room built inside the home (closet, bathroom). Meets FEMA P-320.</td>
              <td>$6,000-$15,000</td>
            </tr>
            <tr>
              <td>Community shelter</td>
              <td>Large capacity shelter for schools, mobile home parks, or neighborhoods. Meets FEMA P-361.</td>
              <td>Varies (often grant funded)</td>
            </tr>
          </tbody>
        </table>

        <div style={{ background: '#e8e8e8', border: 'none', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf', padding: '8px 12px', margin: '8px 0' }}>
          <p style={{ fontWeight: 'bold', color: '#cc9900' }}>
            Mobile Homes Have NO Safe Room
          </p>
          <p>
            No interior room in a mobile home is safe during a tornado. <strong>Always</strong> have a
            plan to reach a permanent structure or community shelter. Many mobile home communities have
            designated storm shelters: know where yours is before severe weather season begins.
          </p>
        </div>

        <h4>Hurricane Evacuation Zones</h4>
        <ul>
          <li><strong>Know your zone</strong>: Most coastal counties assign zones (A, B, C, etc.) based on storm surge risk</li>
          <li><strong>Zone A</strong> is the most vulnerable and evacuated first</li>
          <li><strong>Plan your route</strong>: Know at least 2 evacuation routes in case one is blocked</li>
          <li><strong>Don't wait</strong>: When evacuation is ordered, roads fill quickly. Leave early.</li>
          <li><strong>Bring your kit</strong>: Your emergency supply kit goes with you</li>
          <li><strong>Know your shelter</strong>: Find local shelters at <strong>ready.gov</strong> or your county emergency management website</li>
        </ul>

        <h4>Shelter in Place Basics</h4>
        <ul>
          <li><strong>Tornado:</strong> Lowest floor, interior room (no windows), cover yourself with mattress or blankets</li>
          <li><strong>Hurricane:</strong> Interior room away from windows on the lowest floor. Board windows before the storm.</li>
          <li><strong>Chemical/hazmat:</strong> Close all windows and doors, turn off HVAC, seal gaps with plastic sheeting and duct tape</li>
          <li><strong>Flooding:</strong> Move to the highest floor. <strong>Never</strong> go to the basement or attic without roof access.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'alerts-setup',
    title: 'Setting Up Weather Alerts',
    content: (
      <>
        <p>
          Getting warnings as fast as possible is critical. Here are the best ways to receive alerts:
        </p>

        <h4>NOAA Weather Radio (NWR)</h4>
        <div style={{ background: '#e8e8e8', border: 'none', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf', padding: '8px 12px', margin: '8px 0' }}>
          <p style={{ fontWeight: 'bold', color: '#135997' }}>
            The gold standard for severe weather alerts.
          </p>
          <p>
            NOAA Weather Radio broadcasts continuous weather information 24/7 on VHF
            frequencies. Modern receivers have SAME (Specific Area Message Encoding)
            technology that triggers an alarm only for YOUR county, even at 3 AM.
          </p>
        </div>
        <ul>
          <li>Broadcasts on 7 frequencies: 162.400-162.550 MHz</li>
          <li>Battery backup activates during power outages</li>
          <li>Can be programmed for your specific county FIPS code</li>
          <li>Costs $20-$60 for a good receiver</li>
          <li>Available at most electronics stores and online retailers</li>
        </ul>

        <h4>Wireless Emergency Alerts (WEA)</h4>
        <p>
          Automatic alerts sent to cell phones in the affected area. No app or
          signup required.
        </p>
        <table>
          <thead>
            <tr><th>Alert Type</th><th>Can Disable?</th><th>Content</th></tr>
          </thead>
          <tbody>
            <tr><td>Presidential Alert</td><td>No</td><td>National emergency</td></tr>
            <tr><td>Imminent Threat</td><td>Yes</td><td>Tornado Warning, Flash Flood Warning, etc.</td></tr>
            <tr><td>AMBER Alert</td><td>Yes</td><td>Missing child</td></tr>
          </tbody>
        </table>
        <p>
          <strong>Important:</strong> Keep "Imminent Threat" alerts enabled on your phone.
          Go to Settings &gt; Notifications &gt; Emergency Alerts to verify.
        </p>

        <h4>Weather Apps</h4>
        <ul>
          <li><strong>NWS Weather.gov</strong>: Official forecasts and warnings; no ads, no hype</li>
          <li><strong>Weather Underground</strong>: Community driven with personal weather station data</li>
          <li><strong>RadarScope</strong>: Professional grade radar app ($10, one time purchase)</li>
          <li><strong>MyRadar</strong>: Free, simple radar with alert notifications</li>
        </ul>

        <h4>Additional Sources</h4>
        <ul>
          <li><strong>Local TV meteorologists</strong>: Often provide the most detailed local coverage during events</li>
          <li><strong>Social media</strong>: Follow your local NWS office on Twitter/X for real time updates</li>
          <li><strong>AM/FM radio</strong>: Backup when cell networks and internet are down</li>
          <li><strong>Outdoor warning sirens</strong>: Only meant to alert people <strong>outdoors</strong>; not reliable indoors</li>
        </ul>
      </>
    ),
  },
  {
    id: 'seasonal',
    title: 'Seasonal Preparedness',
    content: (
      <>
        <h4>Tornado Season (March June)</h4>
        <ul>
          <li>Review shelter plan with all family members</li>
          <li>Test NOAA Weather Radio batteries and programming</li>
          <li>Identify the lowest, most interior room in your home</li>
          <li>Clear a path to your shelter area</li>
          <li>Check for community shelter locations if you live in a mobile home</li>
          <li>Practice tornado drills: goal: everyone in shelter within 2 minutes</li>
        </ul>

        <h4>Hurricane Season (June 1 - November 30)</h4>
        <ul>
          <li>Know your evacuation zone and route by June 1</li>
          <li>Stock or refresh emergency supplies</li>
          <li>Review insurance coverage (flood insurance has a 30-day waiting period)</li>
          <li>Trim trees and secure outdoor items that could become projectiles</li>
          <li>Have plywood or hurricane shutters ready for windows</li>
          <li>Fill prescriptions and gather important documents</li>
          <li>Have cash available (ATMs won't work without power)</li>
        </ul>

        <h4>Winter Storm Season (November March)</h4>
        <ul>
          <li>Service heating systems before winter</li>
          <li>Stock extra blankets, warm clothing, and sleeping bags</li>
          <li>Winterize vehicles: check antifreeze, battery, tires, wipers, and emergency kit in trunk</li>
          <li>Have rock salt, sand, or cat litter for icy walkways</li>
          <li>Know how to prevent and thaw frozen pipes</li>
          <li>Store extra water (pipes may freeze and burst)</li>
          <li>Have a carbon monoxide detector (generators and space heaters are CO hazards)</li>
        </ul>

        <div style={{ background: '#e8e8e8', border: 'none', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf', padding: '8px 12px', margin: '8px 0' }}>
          <p style={{ fontWeight: 'bold', color: '#cc0000' }}>
            Generator Safety
          </p>
          <p>
            <strong>NEVER run a generator indoors</strong>, in a garage, or near open
            windows. Carbon monoxide from generators kills dozens of people every year
            during power outages. Place generators at least 20 feet from any building
            with the exhaust pointing away from doors and windows.
          </p>
        </div>

        <h4>Extreme Heat (May September)</h4>
        <ul>
          <li>Identify cooling centers in your community</li>
          <li>Check on elderly neighbors and those without air conditioning</li>
          <li>Never leave children or pets in parked vehicles</li>
          <li>Stay hydrated: drink water before you feel thirsty</li>
          <li>Know the signs of heat exhaustion (heavy sweating, weakness, nausea) and heat stroke (hot dry skin, confusion: call 911)</li>
        </ul>
      </>
    ),
  },
];

export default function EmergencyPreparedness() {
  const [openSection, setOpenSection] = useState('kit');

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
        Emergency Preparedness
      </div>

      <div style={{ padding: '8px 16px', background: '#e8e8e8', borderBottom: '2px solid #808080', fontSize: '12px', color: '#000', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf' }}>
        Be ready before severe weather strikes. Preparation saves lives.
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
          Sources
        </div>
        <ul style={{ margin: '2px 0 0 16px', listStyleType: 'disc' }}>
          <li>FEMA &mdash; ready.gov &mdash; Emergency supply lists, family plans, shelter guidance</li>
          <li>National Weather Service (NWS) &mdash; weather.gov &mdash; Seasonal safety tips, alert systems</li>
          <li>American Red Cross &mdash; redcross.org &mdash; First aid, shelter locations, preparedness checklists</li>
          <li>NOAA Weather Radio &mdash; weather.gov/nwr &mdash; NWR station locations and SAME codes</li>
          <li>FEMA Safe Room Standards &mdash; P-320 (residential) and P-361 (community)</li>
        </ul>
        <div style={{ color: '#999', marginTop: '4px' }}>
          Information based on federal emergency management guidelines current as of 2024.
        </div>
      </div>
    </div>
  );
}
