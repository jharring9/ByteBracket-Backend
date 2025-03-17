/**
 * Current AP Rankings, using in the top 25.
 */
exports.AP_RANKINGS = new Map([
  ["Duke", 1],
  ["Houston", 2],
  ["Auburn", 3],
  ["Florida", 4],
  ["Alabama", 5],
  ["St. John's (NY)", 6],
  ["Michigan State.", 7],
  ["Tennessee", 8],
  ["Texas Tech", 9],
  ["Clemson", 10],
  ["Maryland", 11],
  ["Iowa State", 12],
  ["Louisville", 13],
  ["Texas A&M", 14],
  ["Kentucky", 15],
  ["Memphis", 16],
  ["Brigham Young", 17],
  ["Wisconsin", 18],
  ["Saint Mary's (CA)", 19],
  ["Purdue", 20],
  ["Missouri", 21],
  ["Michigan", 22],
  ["Oregon", 23],
  ["Illinois", 24],
  ["Marquette", 25],
]);

/**
 * Logos for each team in the field. Team names must match exactly. Order does not matter.
 */
exports.LOGOS = {
  /* East Region */
  "Duke":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Duke_Athletics_logo.svg/2293px-Duke_Athletics_logo.svg.png",
  "Alabama":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Alabama_Athletics_logo.svg/800px-Alabama_Athletics_logo.svg.png",
  "Wisconsin":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wisconsin_Badgers_logo.svg/2171px-Wisconsin_Badgers_logo.svg.png",
  "Arizona":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Arizona_Wildcats_logo.svg/504px-Arizona_Wildcats_logo.svg.png",
  "Oregon":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Oregon_Ducks_logo.svg/2510px-Oregon_Ducks_logo.svg.png",
  "Brigham Young":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/BYU_Cougars_logo.svg/2560px-BYU_Cougars_logo.svg.png",
  "Saint Mary's (CA)":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Saint_Mary%27s_College_Gaels_logo.svg/2560px-Saint_Mary%27s_College_Gaels_logo.svg.png",
  "Mississippi State":
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Mississippi_State_Bulldogs_logo.svg",
  "Baylor":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Baylor_Athletics_logo.svg/640px-Baylor_Athletics_logo.svg.png",
  "Vanderbilt":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Vanderbilt_Commodores_logo.svg/1024px-Vanderbilt_Commodores_logo.svg.png",
  "Virginia Commonwealth": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/VCU_Rams_logo.svg/1200px-VCU_Rams_logo.svg.png",
  "Liberty":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Liberty_Athletics_logo.svg/1200px-Liberty_Athletics_logo.svg.png",
  "Akron":
      "https://upload.wikimedia.org/wikipedia/commons/4/41/Akron_Z_logo_2015.png",
  "Montana": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Montana_Grizzlies_logo.svg/1200px-Montana_Grizzlies_logo.svg.png",
  "Robert Morris": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Robert_Morris_Colonials_logo.svg/1200px-Robert_Morris_Colonials_logo.svg.png",
  "American":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/American_Eagles_logo.svg/1200px-American_Eagles_logo.svg.png",
  "Mount St. Mary's":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mount_St._Mary%27s_Mountaineers_logo.svg/1200px-Mount_St._Mary%27s_Mountaineers_logo.svg.png",

  /* West Region */
  "Florida":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png",
  "St. John's (NY)": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/St._John%27s_Red_Storm_logo.svg/1200px-St._John%27s_Red_Storm_logo.svg.png",
  "Texas Tech":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Texas_Tech_Athletics_logo.svg/800px-Texas_Tech_Athletics_logo.svg.png",
  "Maryland":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Maryland_Terrapins_logo.svg/1200px-Maryland_Terrapins_logo.svg.png",
  "Memphis":// TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Memphis_Tigers_logo.svg/1200px-Memphis_Tigers_logo.svg.png",
  "Missouri":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Missouri_Tigers_logo.svg/1200px-Missouri_Tigers_logo.svg.png",
  "Kansas":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kansas_Jayhawks_1946_logo.svg/1200px-Kansas_Jayhawks_1946_logo.svg.png",
  "Connecticut":
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Connecticut_Huskies_logo.svg/1200px-Connecticut_Huskies_logo.svg.png",
  "Oklahoma":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Oklahoma_Sooners_logo.svg/1124px-Oklahoma_Sooners_logo.svg.png",
  "Arkansas": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Arkansas_Razorbacks_logo.svg/1200px-Arkansas_Razorbacks_logo.svg.png",
  "Drake":
      "https://upload.wikimedia.org/wikipedia/en/f/fc/Drake_Bulldogs_logo.svg",
  "Colorado State":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Colorado_State_Rams_logo.svg/1200px-Colorado_State_Rams_logo.svg.png",
  "Grand Canyon":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Grand_Canyon_Antelopes_logo.svg/2560px-Grand_Canyon_Antelopes_logo.svg.png",
  "UNC Wilmington": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/UNC_Wilmington_Seahawks_logo.svg/1200px-UNC_Wilmington_Seahawks_logo.svg.png",
  "Omaha": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Omaha_Mavericks_O_logo.svg/1200px-Omaha_Mavericks_O_logo.svg.png",
  "Norfolk State": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Norfolk_State_Spartans_logo.svg/1200px-Norfolk_State_Spartans_logo.svg.png",

  /* South Region */
  "Auburn":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Auburn_Tigers_logo.svg/2317px-Auburn_Tigers_logo.svg.png",
  "Michigan St.":
      "https://upload.wikimedia.org/wikipedia/en/a/a7/Michigan_State_Athletics_logo.svg",
  "Iowa St.":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Iowa_State_Cyclones_logo.svg/2560px-Iowa_State_Cyclones_logo.svg.png",
  "Texas A&M":
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Texas_A%26M_University_logo.svg",
  "Michigan":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/1200px-Michigan_Wolverines_logo.svg.png",
  "Mississippi": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Mississippi_Rebels_logo.svg/1200px-Mississippi_Rebels_logo.svg.png",
  "Marquette":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Marquette_Golden_Eagles_logo.svg/2560px-Marquette_Golden_Eagles_logo.svg.png",
  "Louisville":
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Louisville_Cardinals_logo.svg/1200px-Louisville_Cardinals_logo.svg.png",
  "Creighton":
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Creighton_Bluejays_logo.svg/1200px-Creighton_Bluejays_logo.svg.png",
  "New Mexico":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/New_Mexico_Lobos_logo.svg/1200px-New_Mexico_Lobos_logo.svg.png",
  "San Diego St.":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/San_Diego_State_Aztecs_logo.svg/2560px-San_Diego_State_Aztecs_logo.svg.png",
  "North Carolina":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/North_Carolina_Tar_Heels_logo.svg/2560px-North_Carolina_Tar_Heels_logo.svg.png",
  "UC San Diego": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/UC_San_Diego_Tritons_logo.svg/1200px-UC_San_Diego_Tritons_logo.svg.png",
  "Yale":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Yale_Bulldogs_script.svg/1200px-Yale_Bulldogs_script.svg.png",
  "Lipscomb": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Lipscomb_Bisons_logo.svg/1200px-Lipscomb_Bisons_logo.svg.png",
  "Bryant": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Bryant_Bulldogs_logo.svg/1200px-Bryant_Bulldogs_logo.svg.png",
  "Alabama State":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Alabama_State_Hornets_logo.svg/1200px-Alabama_State_Hornets_logo.svg.png",
  "Saint Francis (PA)":
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Saint_Francis_Red_Flash_logo.svg/1200px-Saint_Francis_Red_Flash_logo.svg.png",

  /* Midwest Region */
  "Houston":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Houston_Cougars_logo.svg/404px-Houston_Cougars_logo.svg.png",
  "Tennessee":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tennessee_Volunteers_logo.svg/2048px-Tennessee_Volunteers_logo.svg.png",
  "Kentucky":
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/Kentucky_Wildcats_logo_2015.png",
  "Purdue":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Purdue_Boilermakers_logo.svg/2560px-Purdue_Boilermakers_logo.svg.png",
  "Clemson":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Clemson_Tigers_logo.svg/1200px-Clemson_Tigers_logo.svg.png",
  "Illinois":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Illinois_Fighting_Illini_logo.svg/1420px-Illinois_Fighting_Illini_logo.svg.png",
  "UCLA": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UCLA_Bruins_script_logo.svg/1200px-UCLA_Bruins_script_logo.svg.png",
  "Gonzaga":
      "https://upload.wikimedia.org/wikipedia/en/b/bd/Gonzaga_Bulldogs_logo.svg",
  "Georgia":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Georgia_Athletics_logo.svg/1200px-Georgia_Athletics_logo.svg.png",
  "Utah State":
      "https://upload.wikimedia.org/wikipedia/commons/5/59/Utah_State_Aggies_logo.svg",
  "Texas":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Texas_Longhorns_logo.svg/2560px-Texas_Longhorns_logo.svg.png",
  "Xavier":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Xavier_Musketeers_logo.svg/1200px-Xavier_Musketeers_logo.svg.png",
  "McNeese State":
      "https://upload.wikimedia.org/wikipedia/commons/3/31/McNeese_State_%22M%22_logo.png",
  "High Point": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/High_Point_Panthers_logo.svg/1200px-High_Point_Panthers_logo.svg.png",
  "Troy": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Troy_Trojans_logo.svg/1200px-Troy_Trojans_logo.svg.png",
  "Wofford": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Wofford_Terriers_logo.svg/1200px-Wofford_Terriers_logo.svg.png",
  "SIU Edwardsville": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/SIU_Edwardsville_Cougars_logo.svg/1200px-SIU_Edwardsville_Cougars_logo.svg.png"
};

/**
 * Teams in the tournament. Every 16 indices represents a new region. Seeds are in order 1-16 for each region.
 */
exports.TEAMS = [
  /* South */
  "Auburn",
  "Michigan State",
  "Iowa State",
  "Texas A&M",
  "Michigan",
  "Mississippi",
  "Marquette",
  "Louisville",
  "Creighton",
  "New Mexico",
  "San Diego State/North Carolina",
  "UC San Diego",
  "Yale",
  "Lipscomb",
  "Bryant",
  "Alabama State/Saint Francis (PA)",

  /* West */
  "Florida",
  "St. John's (NY)",
  "Texas Tech",
  "Maryland",
  "Memphis",
  "Missouri",
  "Kansas",
  "Connecticut",
  "Oklahoma",
  "Arkansas",
  "Drake",
  "Colorado State",
  "Grand Canyon",
  "UNC Wilmington",
  "Omaha",
  "Norfolk State",

  /* East */
  "Duke",
  "Alabama",
  "Wisconsin",
  "Arizona",
  "Oregon",
  "Brigham Young",
  "Saint Mary's (CA)",
  "Mississippi State",
  "Baylor",
  "Vanderbilt",
  "Virginia Commonwealth",
  "Liberty",
  "Akron",
  "Montana",
  "Robert Morris",
  "American/Mount St. Mary's",

  /* Midwest */
  "Houston",
  "Tennessee",
  "Kentucky",
  "Purdue",
  "Clemson",
  "Illinois",
  "UCLA",
  "Gonzaga",
  "Georgia",
  "Utah State",
  "Texas/Xavier",
  "McNeese State",
  "High Point",
  "Troy",
  "Wofford",
  "SIU Edwardsville",
];

exports.FIRST_FOUR = [
  ["San Diego State", "North Carolina"],
  ["Texas", "Xavier"],
  ["Alabama State", "Saint Francis (PA)"],
  ["American", "Mount St. Mary's"],
];
