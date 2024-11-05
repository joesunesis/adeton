export interface City {
  name: string;
  districts?: string[];
}

export interface Region {
  name: string;
  cities: City[];
}

export const ghanaRegions: Region[] = [
  {
    name: "Greater Accra",
    cities: [
      {
        name: "Accra",
        districts: ["Adenta", "East Legon", "Teshie", "Nungua", "Tema", "Spintex", "Lapaz", "Madina", "Kaneshie", "Dansoman"]
      },
      { name: "Tema" },
      { name: "Ashaiman" },
      { name: "Madina" },
      { name: "Teshie" },
      { name: "La" },
      { name: "Nungua" }
    ]
  },
  {
    name: "Ashanti",
    cities: [
      {
        name: "Kumasi",
        districts: ["Adum", "Asafo", "Bantama", "Nhyiaeso", "Suame", "Tafo", "Asokwa"]
      },
      { name: "Obuasi" },
      { name: "Ejisu" },
      { name: "Bekwai" },
      { name: "Mampong" },
      { name: "Konongo" }
    ]
  },
  {
    name: "Western",
    cities: [
      { name: "Sekondi-Takoradi" },
      { name: "Tarkwa" },
      { name: "Axim" },
      { name: "Bibiani" },
      { name: "Prestea" }
    ]
  },
  {
    name: "Eastern",
    cities: [
      { name: "Koforidua" },
      { name: "Nkawkaw" },
      { name: "Nsawam" },
      { name: "Mpraeso" },
      { name: "Kibi" }
    ]
  },
  {
    name: "Central",
    cities: [
      { name: "Cape Coast" },
      { name: "Winneba" },
      { name: "Kasoa" },
      { name: "Mankessim" },
      { name: "Elmina" }
    ]
  },
  {
    name: "Northern",
    cities: [
      { name: "Tamale" },
      { name: "Yendi" },
      { name: "Savelugu" },
      { name: "Bimbilla" },
      { name: "Gushegu" }
    ]
  },
  {
    name: "Upper East",
    cities: [
      { name: "Bolgatanga" },
      { name: "Navrongo" },
      { name: "Bawku" },
      { name: "Zebilla" },
      { name: "Pusiga" }
    ]
  },
  {
    name: "Upper West",
    cities: [
      { name: "Wa" },
      { name: "Lawra" },
      { name: "Jirapa" },
      { name: "Nandom" },
      { name: "Tumu" }
    ]
  },
  {
    name: "Volta",
    cities: [
      { name: "Ho" },
      { name: "Keta" },
      { name: "Hohoe" },
      { name: "Aflao" },
      { name: "Kpando" }
    ]
  },
  {
    name: "Bono",
    cities: [
      { name: "Sunyani" },
      { name: "Berekum" },
      { name: "Dormaa Ahenkro" },
      { name: "Wenchi" },
      { name: "Techiman" }
    ]
  },
  {
    name: "Savannah",
    cities: [
      { name: "Damongo" },
      { name: "Salaga" },
      { name: "Bole" },
      { name: "Sawla" },
      { name: "Daboya" }
    ]
  },
  {
    name: "North East",
    cities: [
      { name: "Nalerigu" },
      { name: "Gambaga" },
      { name: "Walewale" },
      { name: "Chereponi" },
      { name: "Yunyo" }
    ]
  },
  {
    name: "Bono East",
    cities: [
      { name: "Techiman" },
      { name: "Kintampo" },
      { name: "Nkoranza" },
      { name: "Atebubu" },
      { name: "Yeji" }
    ]
  },
  {
    name: "Oti",
    cities: [
      { name: "Dambai" },
      { name: "Kadjebi" },
      { name: "Jasikan" },
      { name: "Nkwanta" },
      { name: "Worawora" }
    ]
  },
  {
    name: "Ahafo",
    cities: [
      { name: "Goaso" },
      { name: "Hwidiem" },
      { name: "Kenyasi" },
      { name: "Kukuom" },
      { name: "Duayaw Nkwanta" }
    ]
  },
  {
    name: "Western North",
    cities: [
      { name: "Sefwi Wiawso" },
      { name: "Bibiani" },
      { name: "Enchi" },
      { name: "Juaboso" },
      { name: "Akontombra" }
    ]
  }
];