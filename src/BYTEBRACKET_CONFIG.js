/**
 * Current AP Rankings, using in the top 25.
 */
exports.AP_RANKINGS = new Map([
  ["Houston", 1],
  ["Connecticut", 2],
  ["Purdue", 3],
  ["North Carolina", 4],
  ["Tennessee", 5],
  ["Arizona", 6],
  ["Iowa St.", 7],
  ["Creighton", 8],
  ["Kentucky", 9],
  ["Marquette", 10],
  ["Duke", 11],
  ["Auburn", 12],
  ["Illinois", 13],
  ["Baylor", 14],
  ["South Carolina", 15],
  ["Kansas", 16],
  ["Gonzaga", 17],
  ["Utah St.", 18],
  ["Alabama", 19],
  ["Brigham Young", 20],
  ["Saint Mary's (CA)", 21],
  ["Washington St.", 22],
  ["Nevada", 23],
  ["Dayton", 24],
  ["Texas Tech", 25],
]);

/**
 * Logos for each team in the field. Team names must match exactly. Order does not matter.
 */
exports.LOGOS = {
  Houston:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Houston_Cougars_logo.svg/404px-Houston_Cougars_logo.svg.png",
  Marquette:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Marquette_Golden_Eagles_logo.svg/2560px-Marquette_Golden_Eagles_logo.svg.png",
  Illinois:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Illinois_Fighting_Illini_logo.svg/1420px-Illinois_Fighting_Illini_logo.svg.png",
  Kentucky:
    "https://upload.wikimedia.org/wikipedia/commons/5/5d/Kentucky_Wildcats_logo_2015.png",
  Wisconsin:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wisconsin_Badgers_logo.svg/2171px-Wisconsin_Badgers_logo.svg.png",
  "Washington St.":
    "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Washington_State_Cougars_logo.svg/1200px-Washington_State_Cougars_logo.svg.png",
  "Utah St.":
    "https://upload.wikimedia.org/wikipedia/commons/5/59/Utah_State_Aggies_logo.svg",
  Nebraska:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nebraska_Cornhuskers_logo.svg/2048px-Nebraska_Cornhuskers_logo.svg.png",
  "New Mexico":
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/New_Mexico_Lobos_logo.svg/1200px-New_Mexico_Lobos_logo.svg.png",
  TCU: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/TCU_Horned_Frogs_logo.svg/2560px-TCU_Horned_Frogs_logo.svg.png",
  "James Madison":
    "https://content.sportslogos.net/logos/32/717/full/james_madison_dukes_logo_primary_20128040.png",
  "McNeese St.":
    "https://upload.wikimedia.org/wikipedia/commons/3/31/McNeese_State_%22M%22_logo.png",
  UAB: "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/UAB_Blazers_logo.svg/200px-UAB_Blazers_logo.svg.png",
  Colgate:
    "https://upload.wikimedia.org/wikipedia/commons/8/84/Colgate_Raiders_%282020%29_logo.svg",
  "Western Kentucky":
    "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/WKU_Athletics_logo.svg/800px-WKU_Athletics_logo.svg.png",
  Stetson:
    "https://upload.wikimedia.org/wikipedia/en/1/17/Stetson_Hatters_logo_%282018%29.png",
  Connecticut:
    "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Connecticut_Huskies_logo.svg/1200px-Connecticut_Huskies_logo.svg.png",
  "Iowa St.":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Iowa_State_Cyclones_logo.svg/2560px-Iowa_State_Cyclones_logo.svg.png",
  Auburn:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Auburn_Tigers_logo.svg/2317px-Auburn_Tigers_logo.svg.png",
  Duke: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Duke_Athletics_logo.svg/2293px-Duke_Athletics_logo.svg.png",
  Florida:
    "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png",
  "Saint Mary's (CA)":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Saint_Mary%27s_College_Gaels_logo.svg/2560px-Saint_Mary%27s_College_Gaels_logo.svg.png",
  Nevada:
    "https://upload.wikimedia.org/wikipedia/commons/5/53/Nevada_Wolf_Pack_alternate_logo.png",
  "Boise St.":
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Primary_Boise_State_Broncos_Athletics_Logo.svg/1200px-Primary_Boise_State_Broncos_Athletics_Logo.svg.png",
  "Mississippi St.":
    "https://upload.wikimedia.org/wikipedia/commons/3/36/Mississippi_State_Bulldogs_logo.svg",
  "Florida Atlantic":
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Florida_Atlantic_Owls_logo.svg/800px-Florida_Atlantic_Owls_logo.svg.png",
  "NC St.":
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/NC_State_Wolfpack_logo.svg/1200px-NC_State_Wolfpack_logo.svg.png",
  Vermont:
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Vermont_Catamounts_logo.svg/1200px-Vermont_Catamounts_logo.svg.png",
  Akron:
    "https://upload.wikimedia.org/wikipedia/commons/4/41/Akron_Z_logo_2015.png",
  "South Dakota St.":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/South_Dakota_State_University_logo.svg/1917px-South_Dakota_State_University_logo.svg.png",
  Longwood:
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Longwood_University_seal.svg/1200px-Longwood_University_seal.svg.png",
  Purdue:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Purdue_Boilermakers_logo.svg/2560px-Purdue_Boilermakers_logo.svg.png",
  Tennessee:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tennessee_Volunteers_logo.svg/2048px-Tennessee_Volunteers_logo.svg.png",
  Texas:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Texas_Longhorns_logo.svg/2560px-Texas_Longhorns_logo.svg.png",
  Creighton:
    "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Creighton_Bluejays_logo.svg/1200px-Creighton_Bluejays_logo.svg.png",
  Kansas:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kansas_Jayhawks_1946_logo.svg/1200px-Kansas_Jayhawks_1946_logo.svg.png",
  "South Carolina":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/South_Carolina_Gamecocks_logo.svg/1200px-South_Carolina_Gamecocks_logo.svg.png",
  "Texas Tech":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Texas_Tech_Athletics_logo.svg/800px-Texas_Tech_Athletics_logo.svg.png",
  Clemson:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Clemson_Tigers_logo.svg/1200px-Clemson_Tigers_logo.svg.png",
  Dayton:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Dayton_Flyers_lockup_2line_red-blue.svg/1200px-Dayton_Flyers_lockup_2line_red-blue.svg.png",
  Samford:
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Samford_wordmark.png",
  "Colorado St.":
    "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Colorado_State_Rams_logo.svg/1200px-Colorado_State_Rams_logo.svg.png",
  Oregon:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Oregon_Ducks_logo.svg/2510px-Oregon_Ducks_logo.svg.png",
  "Morehead St.":
    "https://upload.wikimedia.org/wikipedia/commons/e/e8/Morehead_State_%22M%22.png",
  Yale: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Yale_Bulldogs_script.svg/1200px-Yale_Bulldogs_script.svg.png",
  "Montana St.":
    "https://upload.wikimedia.org/wikipedia/en/2/2f/Montana_St._Bobcats_logo.svg",
  "Saint Peter's":
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Saint_Peter%27s_Peacocks_logo.svg/1200px-Saint_Peter%27s_Peacocks_logo.svg.png",
  Grambling:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Grambling_St._Tigers_logo.svg/2560px-Grambling_St._Tigers_logo.svg.png",
  "North Carolina":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/North_Carolina_Tar_Heels_logo.svg/2560px-North_Carolina_Tar_Heels_logo.svg.png",
  Arizona:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Arizona_Wildcats_logo.svg/504px-Arizona_Wildcats_logo.svg.png",
  Baylor:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Baylor_Athletics_logo.svg/640px-Baylor_Athletics_logo.svg.png",
  Alabama:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Alabama_Athletics_logo.svg/800px-Alabama_Athletics_logo.svg.png",
  "Brigham Young":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/BYU_Cougars_logo.svg/2560px-BYU_Cougars_logo.svg.png",
  "San Diego St.":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/San_Diego_State_Aztecs_logo.svg/2560px-San_Diego_State_Aztecs_logo.svg.png",
  Gonzaga:
    "https://upload.wikimedia.org/wikipedia/en/b/bd/Gonzaga_Bulldogs_logo.svg",
  Northwestern:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Northwestern_Wildcats_logo.svg/1330px-Northwestern_Wildcats_logo.svg.png",
  "Texas A&M":
    "https://upload.wikimedia.org/wikipedia/commons/e/ee/Texas_A%26M_University_logo.svg",
  "Michigan St.":
    "https://upload.wikimedia.org/wikipedia/en/a/a7/Michigan_State_Athletics_logo.svg",
  Drake:
    "https://upload.wikimedia.org/wikipedia/en/f/fc/Drake_Bulldogs_logo.svg",
  "Grand Canyon":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Grand_Canyon_Antelopes_logo.svg/2560px-Grand_Canyon_Antelopes_logo.svg.png",
  Charleston:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/College_of_Charleston_Cougars_logo.svg/1760px-College_of_Charleston_Cougars_logo.svg.png",
  Oakland:
    "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Oakland_Golden_Grizzlies_logo.svg/1200px-Oakland_Golden_Grizzlies_logo.svg.png",
  "Long Beach St.":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Long-beach-st_logo_from_NCAA.svg/1677px-Long-beach-st_logo_from_NCAA.svg.png",
  Howard:
    "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Howard_Bison_logo.svg/1200px-Howard_Bison_logo.svg.png",
  Duquesne:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Duquesne_Dukes_logo.svg/1200px-Duquesne_Dukes_logo.svg.png",
  Virginia:
    "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Virginia_Cavaliers_sabre.svg/1280px-Virginia_Cavaliers_sabre.svg.png",
  Colorado:
    "https://upload.wikimedia.org/wikipedia/commons/d/d4/Colorado_Buffs_alternate_logo.png",
  Wagner:
    "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Wagner_Seahawks_logo.svg/1200px-Wagner_Seahawks_logo.svg.png",
};

/**
 * Teams in the tournament. Every 16 indices represents a new region. Seeds are in order 1-16 for each region.
 */
exports.TEAMS = [
  /* East */
  "Connecticut",
  "Iowa St.",
  "Illinois",
  "Auburn",
  "San Diego St.",
  "Brigham Young",
  "Washington St.",
  "Florida Atlantic",
  "Northwestern",
  "Drake",
  "Duquesne",
  "UAB",
  "Yale",
  "Morehead St.",
  "South Dakota St.",
  "Stetson",

  /* West */
  "North Carolina",
  "Arizona",
  "Baylor",
  "Alabama",
  "Saint Mary's (CA)",
  "Clemson",
  "Dayton",
  "Mississippi St.",
  "Michigan St.",
  "Nevada",
  "New Mexico",
  "Grand Canyon",
  "Charleston",
  "Colgate",
  "Long Beach St.",
  "Howard/Wagner",

  /* South */
  "Houston",
  "Marquette",
  "Kentucky",
  "Duke",
  "Wisconsin",
  "Texas Tech",
  "Florida",
  "Nebraska",
  "Texas A&M",
  "Boise St./Colorado",
  "NC St.",
  "James Madison",
  "Vermont",
  "Oakland",
  "Western Kentucky",
  "Longwood",

  /* Midwest */
  "Purdue",
  "Tennessee",
  "Creighton",
  "Kansas",
  "Gonzaga",
  "South Carolina",
  "Texas",
  "Utah St.",
  "TCU",
  "Virginia/Colorado St.",
  "Oregon",
  "McNeese St.",
  "Samford",
  "Akron",
  "Saint Peter's",
  "Grambling/Montana St.",
];

exports.FIRST_FOUR = [
  ["Boise St.", "Colorado"],
  ["Grambling", "Montana St."],
  ["Virginia", "Colorado St."],
  ["Howard", "Wagner"],
];
