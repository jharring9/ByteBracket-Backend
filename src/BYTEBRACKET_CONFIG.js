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
  "Virginia Commonwealth": 
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/New_VCU_Wordmark_Logo.png",
  "Liberty":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Liberty_Athletics_logo.svg/1200px-Liberty_Athletics_logo.svg.png",
  "Akron":
      "https://upload.wikimedia.org/wikipedia/commons/4/41/Akron_Z_logo_2015.png",
  "Montana": // TODO FIX
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/Montana_UM_logo.gif",
  "Robert Morris":
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Robert_Morris_University_logo.svg",
  "American":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/American_Eagles_logo.svg/1200px-American_Eagles_logo.svg.png",
  "Mount St. Mary's":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mount_St._Mary%27s_Mountaineers_logo.svg/1200px-Mount_St._Mary%27s_Mountaineers_logo.svg.png",

  /* West Region */
  "Florida":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png",
  "St. John's (NY)":
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/St-johns-ny_logo_from_NCAA.svg",
  "Texas Tech":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Texas_Tech_Athletics_logo.svg/800px-Texas_Tech_Athletics_logo.svg.png",
  "Maryland":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Maryland_Terrapins_logo.svg/1200px-Maryland_Terrapins_logo.svg.png",
  "Memphis":
      "https://upload.wikimedia.org/wikipedia/commons/1/18/Memphis_tigers_monogram_2013.png",
  "Missouri":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Missouri_Tigers_logo.svg/1200px-Missouri_Tigers_logo.svg.png",
  "Kansas":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kansas_Jayhawks_1946_logo.svg/1200px-Kansas_Jayhawks_1946_logo.svg.png",
  "Connecticut":
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Connecticut_Huskies_logo.svg/1200px-Connecticut_Huskies_logo.svg.png",
  "Oklahoma":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Oklahoma_Sooners_logo.svg/1124px-Oklahoma_Sooners_logo.svg.png",
  "Arkansas": 
      "https://logos-world.net/wp-content/uploads/2020/06/Arkansas-Razorbacks-Logo-2001-2013.png",
  "Drake":
      "https://upload.wikimedia.org/wikipedia/en/f/fc/Drake_Bulldogs_logo.svg",
  "Colorado State":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Colorado_State_Rams_logo.svg/1200px-Colorado_State_Rams_logo.svg.png",
  "Grand Canyon":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Grand_Canyon_Antelopes_logo.svg/2560px-Grand_Canyon_Antelopes_logo.svg.png",
  "UNC Wilmington":
      "https://cdn.freelogovectors.net/wp-content/uploads/2020/12/unc_wilmington-seahawks-logo.png",
  "Omaha": 
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Omaha_Mavericks_logo.svg",
  "Norfolk State": 
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Norfolk_state_univ_wordmark_1999.png",

  /* South Region */
  "Auburn":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Auburn_Tigers_logo.svg/2317px-Auburn_Tigers_logo.svg.png",
  "Michigan State":
      "https://upload.wikimedia.org/wikipedia/en/a/a7/Michigan_State_Athletics_logo.svg",
  "Iowa State":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Iowa_State_Cyclones_logo.svg/2560px-Iowa_State_Cyclones_logo.svg.png",
  "Texas A&M":
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Texas_A%26M_University_logo.svg",
  "Michigan":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/1200px-Michigan_Wolverines_logo.svg.png",
  "Mississippi": 
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Ole_Miss_Rebels_logo.svg",
  "Marquette":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Marquette_Golden_Eagles_logo.svg/2560px-Marquette_Golden_Eagles_logo.svg.png",
  "Louisville":
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Louisville_Cardinals_logo.svg/1200px-Louisville_Cardinals_logo.svg.png",
  "Creighton":
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Creighton_Bluejays_logo.svg/1200px-Creighton_Bluejays_logo.svg.png",
  "New Mexico":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/New_Mexico_Lobos_logo.svg/1200px-New_Mexico_Lobos_logo.svg.png",
  "San Diego State":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/San_Diego_State_Aztecs_logo.svg/2560px-San_Diego_State_Aztecs_logo.svg.png",
  "North Carolina":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/North_Carolina_Tar_Heels_logo.svg/2560px-North_Carolina_Tar_Heels_logo.svg.png",
  "UC San Diego": 
      "https://upload.wikimedia.org/wikipedia/commons/3/36/UC_San_Diego_Tritons_wordmark.jpg",
  "Yale":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Yale_Bulldogs_script.svg/1200px-Yale_Bulldogs_script.svg.png",
  "Lipscomb":
      "https://upload.wikimedia.org/wikipedia/commons/6/6c/Lipscomb_athletics_logo_2012.png",
  "Bryant": 
      "https://upload.wikimedia.org/wikipedia/commons/f/f9/Bryant_athletics_second_logo_2004.png",
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
  "UCLA":
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/UCLA_Bruins_logo.svg",
  "Gonzaga":
      "https://upload.wikimedia.org/wikipedia/en/b/bd/Gonzaga_Bulldogs_logo.svg",
  "Georgia":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Georgia_Athletics_logo.svg/1200px-Georgia_Athletics_logo.svg.png",
  "Utah State":
      "https://upload.wikimedia.org/wikipedia/commons/5/59/Utah_State_Aggies_logo.svg",
  "Texas":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Texas_Longhorns_logo.svg/2560px-Texas_Longhorns_logo.svg.png",
  "Xavier":
      "https://upload.wikimedia.org/wikipedia/commons/b/b1/Xavier_logo-primary-fc-gr.svg",
  "McNeese State":
      "https://upload.wikimedia.org/wikipedia/commons/3/31/McNeese_State_%22M%22_logo.png",
  "High Point": 
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/High_Point_Panthers_logo.svg",
  "Troy": 
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Troy_logo_from_NCAA.svg",
  "Wofford": 
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Wofford_Terriers_wordmark.svg",
  "SIU Edwardsville":
      "https://upload.wikimedia.org/wikipedia/commons/5/51/SIUE_Cougars_logo.svg"
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
