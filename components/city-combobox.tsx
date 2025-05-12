"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const cities = [
  {
    id: "nyc",
    name: "New York City",
    country: "United States",
    countryCode: "US",
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    countryCode: "GB",
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    countryCode: "FR",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    countryCode: "AU",
  },
  {
    id: "berlin",
    name: "Berlin",
    country: "Germany",
    countryCode: "DE",
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    countryCode: "IT",
  },
  {
    id: "madrid",
    name: "Madrid",
    country: "Spain",
    countryCode: "ES",
  },
  {
    id: "moscow",
    name: "Moscow",
    country: "Russia",
    countryCode: "RU",
  },
  {
    id: "beijing",
    name: "Beijing",
    country: "China",
    countryCode: "CN",
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    countryCode: "EG",
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    country: "Brazil",
    countryCode: "BR",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    countryCode: "SG",
  },
  {
    id: "toronto",
    name: "Toronto",
    country: "Canada",
    countryCode: "CA",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    countryCode: "IN",
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    countryCode: "TR",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    countryCode: "TH",
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    countryCode: "NL",
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    countryCode: "KR",
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    countryCode: "MX",
  },
  {
    id: "stockholm",
    name: "Stockholm",
    country: "Sweden",
    countryCode: "SE",
  },
  {
    id: "vienna",
    name: "Vienna",
    country: "Austria",
    countryCode: "AT",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    countryCode: "PT",
  },
  {
    id: "athens",
    name: "Athens",
    country: "Greece",
    countryCode: "GR",
  },
  {
    id: "warsaw",
    name: "Warsaw",
    country: "Poland",
    countryCode: "PL",
  },
  {
    id: "helsinki",
    name: "Helsinki",
    country: "Finland",
    countryCode: "FI",
  },
  {
    id: "oslo",
    name: "Oslo",
    country: "Norway",
    countryCode: "NO",
  },
  {
    id: "copenhagen",
    name: "Copenhagen",
    country: "Denmark",
    countryCode: "DK",
  },
  {
    id: "dublin",
    name: "Dublin",
    country: "Ireland",
    countryCode: "IE",
  },
  {
    id: "afghanistan",
    name: "Kabul",
    country: "Afghanistan",
    countryCode: "AF",
  },
  {
    id: "albania",
    name: "Tirana",
    country: "Albania",
    countryCode: "AL",
  },
  {
    id: "algeria",
    name: "Algiers",
    country: "Algeria",
    countryCode: "DZ",
  },
  {
    id: "andorra",
    name: "Andorra la Vella",
    country: "Andorra",
    countryCode: "AD",
  },
  {
    id: "angola",
    name: "Luanda",
    country: "Angola",
    countryCode: "AO",
  },
  {
    id: "antigua",
    name: "Saint John's",
    country: "Antigua and Barbuda",
    countryCode: "AG",
  },
  {
    id: "argentina",
    name: "Buenos Aires",
    country: "Argentina",
    countryCode: "AR",
  },
  {
    id: "armenia",
    name: "Yerevan",
    country: "Armenia",
    countryCode: "AM",
  },
  {
    id: "azerbaijan",
    name: "Baku",
    country: "Azerbaijan",
    countryCode: "AZ",
  },
  {
    id: "bahamas",
    name: "Nassau",
    country: "Bahamas",
    countryCode: "BS",
  },
  {
    id: "bahrain",
    name: "Manama",
    country: "Bahrain",
    countryCode: "BH",
  },
  {
    id: "bangladesh",
    name: "Dhaka",
    country: "Bangladesh",
    countryCode: "BD",
  },
  {
    id: "barbados",
    name: "Bridgetown",
    country: "Barbados",
    countryCode: "BB",
  },
  {
    id: "belarus",
    name: "Minsk",
    country: "Belarus",
    countryCode: "BY",
  },
  {
    id: "belgium",
    name: "Brussels",
    country: "Belgium",
    countryCode: "BE",
  },
  {
    id: "belize",
    name: "Belmopan",
    country: "Belize",
    countryCode: "BZ",
  },
  {
    id: "benin",
    name: "Porto-Novo",
    country: "Benin",
    countryCode: "BJ",
  },
  {
    id: "bhutan",
    name: "Thimphu",
    country: "Bhutan",
    countryCode: "BT",
  },
  {
    id: "bolivia",
    name: "La Paz",
    country: "Bolivia",
    countryCode: "BO",
  },
  {
    id: "sarajevo",
    name: "Sarajevo",
    country: "Bosnia and Herzegovina",
    countryCode: "BA",
  },
  {
    id: "botswana",
    name: "Gaborone",
    country: "Botswana",
    countryCode: "BW",
  },
  {
    id: "brunei",
    name: "Bandar Seri Begawan",
    country: "Brunei",
    countryCode: "BN",
  },
  {
    id: "bulgaria",
    name: "Sofia",
    country: "Bulgaria",
    countryCode: "BG",
  },
  {
    id: "ouagadougou",
    name: "Ouagadougou",
    country: "Burkina Faso",
    countryCode: "BF",
  },
  {
    id: "burundi",
    name: "Gitega",
    country: "Burundi",
    countryCode: "BI",
  },
  {
    id: "cabo",
    name: "Praia",
    country: "Cabo Verde",
    countryCode: "CV",
  },
  {
    id: "cambodia",
    name: "Phnom Penh",
    country: "Cambodia",
    countryCode: "KH",
  },
  {
    id: "cameroon",
    name: "Yaoundé",
    country: "Cameroon",
    countryCode: "CM",
  },
  {
    id: "Bangui",
    name: "Bangui",
    country: "Central African Republic",
    countryCode: "CF",
  },
  {
    id: "chad",
    name: "N'Djamena",
    country: "Chad",
    countryCode: "TD",
  },
  {
    id: "chile",
    name: "Santiago",
    country: "Chile",
    countryCode: "CL",
  },
  {
    id: "colombia",
    name: "Bogotá",
    country: "Colombia",
    countryCode: "CO",
  },
  {
    id: "comoros",
    name: "Moroni",
    country: "Comoros",
    countryCode: "KM",
  },
  {
    id: "Kinshasa",
    name: "Kinshasa",
    country: "Democratic Republic of the Congo",
    countryCode: "CD",
  },
  {
    id: "Brazzaville",
    name: "Brazzaville",
    country: "Republic of the Congo",
    countryCode: "CG",
  },
  {
    id: "Costa Rica",
    name: "San José",
    country: "Costa Rica",
    countryCode: "CR",
  },
  {
    id: "Yamoussoukro",
    name: "Yamoussoukro",
    country: "Côte d'Ivoire",
    countryCode: "CI",
  },
  {
    id: "croatia",
    name: "Zagreb",
    country: "Croatia",
    countryCode: "HR",
  },
  {
    id: "cuba",
    name: "Havana",
    country: "Cuba",
    countryCode: "CU",
  },
  {
    id: "cyprus",
    name: "Nicosia",
    country: "Cyprus",
    countryCode: "CY",
  },
  {
    id: "Prague",
    name: "Prague",
    country: "Czech Republic",
    countryCode: "CZ",
  },
  {
    id: "djibouti",
    name: "Djibouti",
    country: "Djibouti",
    countryCode: "DJ",
  },
  {
    id: "Roseau",
    name: "Roseau",
    country: "Dominica",
    countryCode: "DM",
  },
  {
    id: "Santo Domingo",
    name: "Santo Domingo",
    country: "Dominican Republic",
    countryCode: "DO",
  },
  {
    id: "Quito",
    name: "Quito",
    country: "Ecuador",
    countryCode: "EC",
  },
  {
    id: "San Salvador",
    name: "San Salvador",
    country: "El Salvador",
    countryCode: "SV",
  },
  {
    id: "equatorial-guinea",
    name: "Malabo",
    country: "Equatorial Guinea",
    countryCode: "GQ",
  },
  {
    id: "eritrea",
    name: "Asmara",
    country: "Eritrea",
    countryCode: "ER",
  },
  {
    id: "estonia",
    name: "Tallinn",
    country: "Estonia",
    countryCode: "EE",
  },
  {
    id: "eswatini",
    name: "Mbabane",
    country: "Eswatini",
    countryCode: "SZ",
  },
  {
    id: "ethiopia",
    name: "Addis Ababa",
    country: "Ethiopia",
    countryCode: "ET",
  },
  {
    id: "fiji",
    name: "Suva",
    country: "Fiji",
    countryCode: "FJ",
  },
  {
    id: "gabon",
    name: "Libreville",
    country: "Gabon",
    countryCode: "GA",
  },
  {
    id: "gambia",
    name: "Banjul",
    country: "Gambia",
    countryCode: "GM",
  },
  {
    id: "georgia",
    name: "Tbilisi",
    country: "Georgia",
    countryCode: "GE",
  },
  {
    id: "ghana",
    name: "Accra",
    country: "Ghana",
    countryCode: "GH",
  },
  {
    id: "grenada",
    name: "St. George's",
    country: "Grenada",
    countryCode: "GD",
  },
  {
    id: "guatemala",
    name: "Guatemala City",
    country: "Guatemala",
    countryCode: "GT",
  },
  {
    id: "guinea",
    name: "Conakry",
    country: "Guinea",
    countryCode: "GN",
  },
  {
    id: "guinea-bissau",
    name: "Bissau",
    country: "Guinea-Bissau",
    countryCode: "GW",
  },
  {
    id: "guyana",
    name: "Georgetown",
    country: "Guyana",
    countryCode: "GY",
  },
  {
    id: "haiti",
    name: "Port-au-Prince",
    country: "Haiti",
    countryCode: "HT",
  },
  {
    id: "honduras",
    name: "Tegucigalpa",
    country: "Honduras",
    countryCode: "HN",
  },
  {
    id: "hungary",
    name: "Budapest",
    country: "Hungary",
    countryCode: "HU",
  },
  {
    id: "iceland",
    name: "Reykjavik",
    country: "Iceland",
    countryCode: "IS",
  },
  {
    id: "indonesia",
    name: "Jakarta",
    country: "Indonesia",
    countryCode: "ID",
  },
  {
    id: "iran",
    name: "Tehran",
    country: "Iran",
    countryCode: "IR",
  },
  {
    id: "iraq",
    name: "Baghdad",
    country: "Iraq",
    countryCode: "IQ",
  },
  {
    id: "jamaica",
    name: "Kingston",
    country: "Jamaica",
    countryCode: "JM",
  },
  {
    id: "jordan",
    name: "Amman",
    country: "Jordan",
    countryCode: "JO",
  },
  {
    id: "kazakhstan",
    name: "Nur-Sultan",
    country: "Kazakhstan",
    countryCode: "KZ",
  },
  {
    id: "kenya",
    name: "Nairobi",
    country: "Kenya",
    countryCode: "KE",
  },
  {
    id: "kiribati",
    name: "Tarawa",
    country: "Kiribati",
    countryCode: "KI",
  },
  {
    id: "kuwait",
    name: "Kuwait City",
    country: "Kuwait",
    countryCode: "KW",
  },
  {
    id: "kyrgyzstan",
    name: "Bishkek",
    country: "Kyrgyzstan",
    countryCode: "KG",
  },
  {
    id: "laos",
    name: "Vientiane",
    country: "Laos",
    countryCode: "LA",
  },
  {
    id: "latvia",
    name: "Riga",
    country: "Latvia",
    countryCode: "LV",
  },
  {
    id: "lebanon",
    name: "Beirut",
    country: "Lebanon",
    countryCode: "LB",
  },
  {
    id: "lesotho",
    name: "Maseru",
    country: "Lesotho",
    countryCode: "LS",
  },
  {
    id: "liberia",
    name: "Monrovia",
    country: "Liberia",
    countryCode: "LR",
  },
  {
    id: "libya",
    name: "Tripoli",
    country: "Libya",
    countryCode: "LY",
  },
  {
    id: "liechtenstein",
    name: "Vaduz",
    country: "Liechtenstein",
    countryCode: "LI",
  },
  {
    id: "lithuania",
    name: "Vilnius",
    country: "Lithuania",
    countryCode: "LT",
  },
  {
    id: "luxembourg",
    name: "Luxembourg City",
    country: "Luxembourg",
    countryCode: "LU",
  },
  {
    id: "madagascar",
    name: "Antananarivo",
    country: "Madagascar",
    countryCode: "MG",
  },
  {
    id: "malawi",
    name: "Lilongwe",
    country: "Malawi",
    countryCode: "MW",
  },
  {
    id: "malaysia",
    name: "Kuala Lumpur",
    country: "Malaysia",
    countryCode: "MY",
  },
  {
    id: "maldives",
    name: "Malé",
    country: "Maldives",
    countryCode: "MV",
  },
  {
    id: "mali",
    name: "Bamako",
    country: "Mali",
    countryCode: "ML",
  },
  {
    id: "malta",
    name: "Valletta",
    country: "Malta",
    countryCode: "MT",
  },
  {
    id: "marshall-islands",
    name: "Majuro",
    country: "Marshall Islands",
    countryCode: "MH",
  },
  {
    id: "mauritania",
    name: "Nouakchott",
    country: "Mauritania",
    countryCode: "MR",
  },
  {
    id: "mauritius",
    name: "Port Louis",
    country: "Mauritius",
    countryCode: "MU",
  },
  {
    id: "micronesia",
    name: "Palikir",
    country: "Micronesia",
    countryCode: "FM",
  },
  {
    id: "moldova",
    name: "Chișinău",
    country: "Moldova",
    countryCode: "MD",
  },
  {
    id: "monaco",
    name: "Monaco",
    country: "Monaco",
    countryCode: "MC",
  },
  {
    id: "mongolia",
    name: "Ulaanbaatar",
    country: "Mongolia",
    countryCode: "MN",
  },
  {
    id: "montenegro",
    name: "Podgorica",
    country: "Montenegro",
    countryCode: "ME",
  },
  {
    id: "morocco",
    name: "Rabat",
    country: "Morocco",
    countryCode: "MA",
  },
  {
    id: "mozambique",
    name: "Maputo",
    country: "Mozambique",
    countryCode: "MZ",
  },
  {
    id: "myanmar",
    name: "Naypyidaw",
    country: "Myanmar",
    countryCode: "MM",
  },
  {
    id: "namibia",
    name: "Windhoek",
    country: "Namibia",
    countryCode: "NA",
  },
  {
    id: "nauru",
    name: "Yaren District",
    country: "Nauru",
    countryCode: "NR",
  },
  {
    id: "nepal",
    name: "Kathmandu",
    country: "Nepal",
    countryCode: "NP",
  },
  {
    id: "new-zealand",
    name: "Wellington",
    country: "New Zealand",
    countryCode: "NZ",
  },
  {
    id: "nicaragua",
    name: "Managua",
    country: "Nicaragua",
    countryCode: "NI",
  },
  {
    id: "niger",
    name: "Niamey",
    country: "Niger",
    countryCode: "NE",
  },
  {
    id: "nigeria",
    name: "Abuja",
    country: "Nigeria",
    countryCode: "NG",
  },
  {
    id: "north-korea",
    name: "Pyongyang",
    country: "North Korea",
    countryCode: "KP",
  },
  {
    id: "north-macedonia",
    name: "Skopje",
    country: "North Macedonia",
    countryCode: "MK",
  },
  {
    id: "oman",
    name: "Muscat",
    country: "Oman",
    countryCode: "OM",
  },
  {
    id: "pakistan",
    name: "Islamabad",
    country: "Pakistan",
    countryCode: "PK",
  },
  {
    id: "palau",
    name: "Ngerulmud",
    country: "Palau",
    countryCode: "PW",
  },
  {
    id: "palestine",
    name: "Ramallah",
    country: "Palestine",
    countryCode: "PS",
  },
  {
    id: "panama",
    name: "Panama City",
    country: "Panama",
    countryCode: "PA",
  },
  {
    id: "papua-new-guinea",
    name: "Port Moresby",
    country: "Papua New Guinea",
    countryCode: "PG",
  },
  {
    id: "paraguay",
    name: "Asunción",
    country: "Paraguay",
    countryCode: "PY",
  },
  {
    id: "peru",
    name: "Lima",
    country: "Peru",
    countryCode: "PE",
  },
  {
    id: "philippines",
    name: "Manila",
    country: "Philippines",
    countryCode: "PH",
  },
  {
    id: "qatar",
    name: "Doha",
    country: "Qatar",
    countryCode: "QA",
  },
  {
    id: "romania",
    name: "Bucharest",
    country: "Romania",
    countryCode: "RO",
  },
  {
    id: "rwanda",
    name: "Kigali",
    country: "Rwanda",
    countryCode: "RW",
  },
  {
    id: "saint-kitts-nevis",
    name: "Basseterre",
    country: "Saint Kitts and Nevis",
    countryCode: "KN",
  },
  {
    id: "saint-lucia",
    name: "Castries",
    country: "Saint Lucia",
    countryCode: "LC",
  },
  {
    id: "saint-vincent-grenadines",
    name: "Kingstown",
    country: "Saint Vincent and the Grenadines",
    countryCode: "VC",
  },
  {
    id: "samoa",
    name: "Apia",
    country: "Samoa",
    countryCode: "WS",
  },
  {
    id: "san-marino",
    name: "San Marino",
    country: "San Marino",
    countryCode: "SM",
  },
  {
    id: "sao-tome-principe",
    name: "São Tomé",
    country: "São Tomé and Príncipe",
    countryCode: "ST",
  },
  {
    id: "saudi-arabia",
    name: "Riyadh",
    country: "Saudi Arabia",
    countryCode: "SA",
  },
  {
    id: "senegal",
    name: "Dakar",
    country: "Senegal",
    countryCode: "SN",
  },
  {
    id: "serbia",
    name: "Belgrade",
    country: "Serbia",
    countryCode: "RS",
  },
  {
    id: "seychelles",
    name: "Victoria",
    country: "Seychelles",
    countryCode: "SC",
  },
  {
    id: "sierra-leone",
    name: "Freetown",
    country: "Sierra Leone",
    countryCode: "SL",
  },
  {
    id: "slovakia",
    name: "Bratislava",
    country: "Slovakia",
    countryCode: "SK",
  },
  {
    id: "slovenia",
    name: "Ljubljana",
    country: "Slovenia",
    countryCode: "SI",
  },
  {
    id: "solomon-islands",
    name: "Honiara",
    country: "Solomon Islands",
    countryCode: "SB",
  },
  {
    id: "somalia",
    name: "Mogadishu",
    country: "Somalia",
    countryCode: "SO",
  },
  {
    id: "south-africa",
    name: "Pretoria",
    country: "South Africa",
    countryCode: "ZA",
  },
  {
    id: "south-sudan",
    name: "Juba",
    country: "South Sudan",
    countryCode: "SS",
  },
  {
    id: "sri-lanka",
    name: "Colombo",
    country: "Sri Lanka",
    countryCode: "LK",
  },
  {
    id: "sudan",
    name: "Khartoum",
    country: "Sudan",
    countryCode: "SD",
  },
  {
    id: "suriname",
    name: "Paramaribo",
    country: "Suriname",
    countryCode: "SR",
  },
  {
    id: "switzerland",
    name: "Bern",
    country: "Switzerland",
    countryCode: "CH",
  },
  {
    id: "syria",
    name: "Damascus",
    country: "Syria",
    countryCode: "SY",
  },
  {
    id: "tajikistan",
    name: "Dushanbe",
    country: "Tajikistan",
    countryCode: "TJ",
  },
  {
    id: "tanzania",
    name: "Dodoma",
    country: "Tanzania",
    countryCode: "TZ",
  },
  {
    id: "timor-leste",
    name: "Dili",
    country: "Timor-Leste",
    countryCode: "TL",
  },
  {
    id: "togo",
    name: "Lomé",
    country: "Togo",
    countryCode: "TG",
  },
  {
    id: "tonga",
    name: "Nuku'alofa",
    country: "Tonga",
    countryCode: "TO",
  },
  {
    id: "trinidad-tobago",
    name: "Port of Spain",
    country: "Trinidad and Tobago",
    countryCode: "TT",
  },
  {
    id: "tunisia",
    name: "Tunis",
    country: "Tunisia",
    countryCode: "TN",
  },
  {
    id: "turkmenistan",
    name: "Ashgabat",
    country: "Turkmenistan",
    countryCode: "TM",
  },
  {
    id: "tuvalu",
    name: "Funafuti",
    country: "Tuvalu",
    countryCode: "TV",
  },
  {
    id: "uganda",
    name: "Kampala",
    country: "Uganda",
    countryCode: "UG",
  },
  {
    id: "ukraine",
    name: "Kyiv",
    country: "Ukraine",
    countryCode: "UA",
  },
  {
    id: "uruguay",
    name: "Montevideo",
    country: "Uruguay",
    countryCode: "UY",
  },
  {
    id: "uzbekistan",
    name: "Tashkent",
    country: "Uzbekistan",
    countryCode: "UZ",
  },
  {
    id: "vanuatu",
    name: "Port Vila",
    country: "Vanuatu",
    countryCode: "VU",
  },
  {
    id: "vatican-city",
    name: "Vatican City",
    country: "Vatican City",
    countryCode: "VA",
  },
  {
    id: "venezuela",
    name: "Caracas",
    country: "Venezuela",
    countryCode: "VE",
  },
  {
    id: "vietnam",
    name: "Hanoi",
    country: "Vietnam",
    countryCode: "VN",
  },
  {
    id: "yemen",
    name: "Sana'a",
    country: "Yemen",
    countryCode: "YE",
  },
  {
    id: "zambia",
    name: "Lusaka",
    country: "Zambia",
    countryCode: "ZM",
  },
  {
    id: "zimbabwe",
    name: "Harare",
    country: "Zimbabwe",
    countryCode: "ZW",
  },
];
export function CityCombobox({
  value,
  onChange,
  disabled,
  placeholder = "Select a city...",
  className,
}: {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          {value ? cities.find((city) => city.id === value)?.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search city or country..." />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {cities.map((city) => (
                <CommandItem
                  key={city.id}
                  value={city.name + " " + city.country}
                  onSelect={() => {
                    if (onChange) {
                      onChange(city.id === value ? "" : city.name);
                    }
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <img
                      src={`https://flagcdn.com/16x12/${city.countryCode.toLowerCase()}.png`}
                      alt={`${city.country} flag`}
                      className="mr-2 h-3 w-4"
                    />
                    <span>
                      {city.name},{" "}
                      <span className="text-muted-foreground">
                        {city.country}
                      </span>
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === city.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
