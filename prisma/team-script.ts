import type { PrismaClient } from "@prisma/client";
import type { Faker } from "@faker-js/faker";

export const teamScript = async (prisma: PrismaClient, faker: Faker) => {
  // Officers
  await prisma.team.create({
    data: {
      id: "0",
      name: "Mary McFarland Brooks",
      title: "President",
      occupation:
        "Communications Manager for Minnesota Department of Transportation. Responsible for aeronautics, passenger rail, and civil rights communications and community engagement. In addition, has served as an adjunct professor in public speaking at Hamline University, in St. Paul, Minnesota.",
      irishConnection:
        "Mary is 100 percent Irish-American (4 corners are McFarland, Reagan, O’Hanlon & Farrell). Mary is the founding president of Irish Network Minnesota chapter. Serves on St. Patrick’s Association, founding member of Failte Minnesota and is editor of Irish Gazette Media, an Irish American publication and social media company.",
      imageUrl:
        "https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/team/Mary-bw.jpg.webp",
      position: "OFFICER",
    },
  });
  await prisma.team.create({
    data: {
      id: "1",
      name: "Patrick Duffy",
      title: "Vice President",
      occupation:
        "Nearly 40 years of experience working in a number of roles at commercial truck dealerships. Currently working at Inver Grove Ford Lincoln selling to fleets and businesses as well as family and friends. Pat has served on the Minnesota Trucking Association Board of Directors, is a past president of the Holy Spirit parish Men’s Club, and volunteered for many years at Edgcumbe Youth Hockey Association.",
      irishConnection:
        "Pat’s mother, Catherine O’Brien Duffy, came to America from Carraroe, Ireland. Pat’s cousins who are still in Carraroe operate Aran Island Ferries. His father, Leo Patrick Duffy Sr., was born and raised in St. Paul. Leo’s grandfather came to America from the Roscommon area of Ireland. Pat’s parents were very involved with the Twin Cities Irish American Club, and were owners with Pete and Maureen O’Brien of Irish Import Gift Store in St Paul from 1971-1977.",
      imageUrl:
        "https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/team/Duffy-Bio-Pic-bw-1.jpg.webp",
      position: "OFFICER",
    },
  });
  await prisma.team.create({
    data: {
      id: "2",
      name: "Martie McMahon",
      title: "Treasurer",
      occupation:
        "Martie works for the Archdiocese of Saint Paul and Minneapolis in the Accounting Services Department. Responsible for payroll and accounts payable. In addition, she has lead tours to Ireland, is an avid volunteer for the Irish Fair of Minnesota, travel writer for the Irish Gazette and taught a travel writing class.",
      irishConnection: "Martie is Irish-American on her father’s side from County Clare.",
      imageUrl:
        "https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/team/Martie-McMan-bw.jpg.webp",
      position: "OFFICER",
    },
  });
  await prisma.team.create({
    data: {
      id: "3",
      name: "Jane Hall",
      title: "Secretary",
      occupation:
        "Jane is a former Data Reporting Analyst with a background in computer programming, medical lab technology and fine art. Her past experience includes work in computer programming, laboratory technology, research and graphic design.",
      irishConnection: "Irish connection: Jane has Irish ancestors on both sides of her family.",
      imageUrl:
        "https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/team/jh.jpg.webp",
      position: "OFFICER",
    },
  });

  // Directors
  await prisma.team.create({
    data: {
      id: "4",
      name: "James Elliott Brooks",
      occupation:
        "Occupation: Founder of Irish Gazette Media, the largest Irish media in the Midwest. Brooks has an extensive background in brand journalism and has been a board member of numerous organizations in both Minnesota and North Dakota, where he was a US Congress candidate.",
      irishConnection:
        "Brooks has Irish ancestors on both his mother’s side, Elliott and McKone and his father’s side who hailed from Armagh. Brooks has served on the St. Patrick’s Association and the Sons of St. Patrick Society among others. He serves as a spokesman for Irish issues throughout the Midwest on radio, television, print and social media.",
      imageUrl: "https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/team/Jim",
      position: "DIRECTOR",
    },
  });
  await prisma.team.create({
    data: {
      id: "5",
      name: "Laurie Ingram McCrory",
      occupation:
        "Laurie is the principal art director and designer of Laurie Ingram Art + Design, an independent art design studio in St. Paul, Minnesota specializing in book cover design, book design, print collateral, and branding. Laurie stays active in the AIGA, Graphic Artists Guild, Walker Art Center, Minneapolis Institute of Arts, Minnesota Book Publishers’ Roundtable, Bookbuilders of Boston, and Minnesota Bookbuilders. Laurie also serves on the Board of Directors for Minnesota Book Publishers’ Roundtable as Social Media Manager.",
      irishConnection:
        "Laurie’s Irish background includes ancestors on her mother’s side (Houston) from County Tyrone. She loves everything Irish, and volunteers at various local Irish events. She is the proud mother of three boys, three grandchildren and currently resides in Saint Paul, MN.",
      imageUrl:
        "https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/team/Laurie-Ingram",
      position: "DIRECTOR",
    },
  });

  // rest
  await prisma.team.create({
    data: {
      id: faker.datatype.uuid(),
      name: "Jamie Flynn",
      position: "ADVISORY",
    },
  });
  await prisma.team.create({
    data: {
      id: faker.datatype.uuid(),
      name: "Brennan Brooks",
      position: "ADVISORY",
    },
  });
  await prisma.team.create({
    data: {
      id: faker.datatype.uuid(),
      name: "Neill O’Neill-Legal Counsel",
      position: "ADVISORY",
    },
  });
  await prisma.team.create({
    data: {
      id: faker.datatype.uuid(),
      name: "Joel Meyer",
      position: "VOLUNTEER",
    },
  });
};
