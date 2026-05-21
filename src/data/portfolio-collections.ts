/**
 * Single source of truth for portfolio grid + navbar + project subpages.
 * `imagePath` values are under `public/` (no leading slash).
 * `slug` is the URL segment: `/portfolio/<slug>`
 */
export type PortfolioWork = {
  imagePath: string;
  title: string;
  subtitle: string;
  medium: string;
  method: string;
  finishings: string;
  substrate: string;
  /** Optional piece-specific description shown on the project page. */
  description?: string;
  /** Section label in the project page grouped gallery (e.g. Finals, Defiant Flora). */
  galleryGroup?: string;
  /** When set, work appears in multiple grouped gallery sections (overrides `galleryGroup`). */
  galleryGroups?: string[];
};

export type PortfolioCollection = {
  id: string;
  /** URL path segment, e.g. talesoflostwonder → /portfolio/talesoflostwonder */
  slug: string;
  title: string;
  subtitle: string;
  notes: string;
  /** Extended project copy shown under the subtitle on the project page. */
  longDescription?: string;
  tags: string[];
  /** Gallery pieces shown on the project detail page (and source for grid cover images). */
  works: PortfolioWork[];
  /** Display order for grouped gallery section labels (project page). */
  galleryGroupOrder?: string[];
};

const defaultWallpaperWork = {
  medium: "Textile wallcovering",
  method: "Hand screen print",
  finishings: "—",
  substrate: "Paper-backed substrate",
};

const defaultExperimentalWork = {
  medium: "Textile print",
  method: "Mixed hand and digital processes",
  finishings: "—",
  substrate: "Cotton substrate",
};

const defaultFashionWork = {
  medium: "Fashion textile",
  method: "Print and embellishment",
  finishings: "—",
  substrate: "Woollen substrate",
};

const noWorkDetails = {
  title: "",
  subtitle: "",
  medium: "—",
  method: "—",
  finishings: "—",
  substrate: "—",
};

const STORIES_SET_IN_STONE_DIR = "images/prints/storiesSetInStone";

const STORIES_SET_IN_STONE_FILES = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpeg",
  "10.jpg",
  "11.jpeg",
  "12.jpeg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "p1.jpeg",
  "p2.jpeg",
  "p3.jpg",
  "p4.jpg",
  "e1.jpeg",
  "e2.jpg",
  "e3.jpg",
  "e4.jpg",
  "e5.jpg",
  "e6.jpg",
  "v1.jpg",
  "v2.jpg",
] as const;

function storiesSetInStoneGalleryGroup(stem: string): string {
  const lower = stem.toLowerCase();
  if (/^p/.test(lower)) return "Paintings";
  if (/^e/.test(lower)) return "Experimentals";
  if (/^v/.test(lower)) return "Visualisations";
  if (/^\d+$/.test(lower)) return "Main Collection";
  return "Main Collection";
}

function storiesSetInStoneSortKey(filename: string): [number, number, string] {
  const stem = filename.replace(/\.[^.]+$/, "").toLowerCase();
  const groupOrder = /^\d+$/.test(stem)
    ? 0
    : /^p/.test(stem)
      ? 1
      : /^e/.test(stem)
        ? 2
        : /^v/.test(stem)
          ? 3
          : 0;
  const num = parseInt(stem.match(/\d+/)?.[0] ?? "0", 10);
  return [groupOrder, num, stem];
}

function buildStoriesSetInStoneWorks(): PortfolioWork[] {
  return [...STORIES_SET_IN_STONE_FILES]
    .sort((a, b) => {
      const [ga, na, sa] = storiesSetInStoneSortKey(a);
      const [gb, nb, sb] = storiesSetInStoneSortKey(b);
      if (ga !== gb) return ga - gb;
      if (na !== nb) return na - nb;
      return sa.localeCompare(sb);
    })
    .map((file) => {
      const stem = file.replace(/\.[^.]+$/, "");
      return {
        imagePath: `${STORIES_SET_IN_STONE_DIR}/${file}`,
        ...noWorkDetails,
        galleryGroup: storiesSetInStoneGalleryGroup(stem),
      };
    });
}

export const PORTFOLIO_COLLECTIONS: PortfolioCollection[] = [
  {
    id: "tales-of-lost-wonder",
    slug: "talesoflostwonder",
    title: "Tales of Lost Wonder",
    subtitle: "Interiors Collection / Print / 2026",
    notes:
      "Textile wallcoverings translating the theme of Scottish folklore and mythology highlighting the loss of childhood wonder.",
    longDescription:
      "‘Tales of Lost Wonder’ is a collection of hand printed, textile wallcoverings, translating the theme of Scottish Folklore and Mythology. Highlighting the generational outlook of these tales and the loss of childhood wonder as we age and mature. Pulling from my own memories to showcase symbolic themes of the Kelpies and protective foliage. Using hand painting techniques, I applied water-based reactive dye as well as discharge and devoré to screen. Creating controlled blends to create a sense of movement and depth that translate the themes of transformation and fading magic. Created using a multi-process design method, blending hand print processes with digital applications to create designs which have commercial viability as well as authenticity. Focusing on layers and colours to create abstract, textural designs suitable for a high-end market. Experimenting with painting dyes within my sketchbook to help inform the design direction. I developed a process that allows me to bond hand printed silk, onto paper to create an innovative interior wallcovering application. Exhibiting hand painted dyes as a mural style product. Creating modern fabrics to reimagine youthful curiosity and bring back this wonder to homes.",
    tags: ["Wallpaper", "Hand Painted", "Bespoke"],
    galleryGroupOrder: ["Finals", "Defiant Flora", "Heathered Hills", "Waterbound", "Visualisations"],
    works: [
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles.jpg",
        title: "Defiant Flora",
        subtitle: "Final Wallcovering",
        galleryGroups: ["Finals", "Defiant Flora"],
        medium: "Reactive Dye, Discharge, Devoré",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb and Pigment on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
        description:
          "This pattern depicts the layering of thistles, symbolising protection and defence as well as beauty. Representing the fading of memories as we age.",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/H1.jpg",
        title: "Heathered Hills",
        subtitle: "Final Wallcovering",
        galleryGroups: ["Finals", "Heathered Hills"],
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
        description:
          "This pattern depicts the highland landscapes where heather grows abundantly to protect travellers from spirits.",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/K1.jpg",
        title: "Waterbound",
        subtitle: "Final Wallcovering",
        galleryGroups: ["Finals", "Waterbound"],
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
        description:
          "This pattern depicts the transformation of the mystical Kelpies from statue to spirit. Highlighting how children see the wonder in folktales.",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/vis1.jpg",
        title: "Visualisation 1",
        subtitle: "Visualisation of Final Sample",
        galleryGroup: "Visualisations",
        medium: "—",
        method: "—",
        finishings: "—",
        substrate: "—",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/vis2.jpg",
        title: "Visualisation 2",
        subtitle: "Visualisation of Final Sample",
        galleryGroup: "Visualisations",
        medium: "—",
        method: "—",
        finishings: "—",
        substrate: "—",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/vis3.jpg",
        title: "Visualisation 3",
        subtitle: "Visualisation of Final Sample",
        galleryGroup: "Visualisations",
        medium: "—",
        method: "—",
        finishings: "—",
        substrate: "—",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/vis4.jpg",
        title: "Visualisation 4",
        subtitle: "Visualisation of Final Sample",
        galleryGroup: "Visualisations",
        medium: "—",
        method: "—",
        finishings: "—",
        substrate: "—",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/vis5.jpg",
        title: "Visualisation 5",
        subtitle: "Visualisation of Final Sample",
        galleryGroup: "Visualisations",
        medium: "—",
        method: "—",
        finishings: "—",
        substrate: "—",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/vis6.jpg",
        title: "Visualisation 6",
        subtitle: "Visualisation of Final Sample",
        galleryGroup: "Visualisations",
        medium: "—",
        method: "—",
        finishings: "—",
        substrate: "—",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles2.jpg",
        title: "Defiant Flora",
        subtitle: "Supporting Sample",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye, Discharge",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles3.jpg",
        title: "Defiant Flora",
        subtitle: "Supporting Sample",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles4.jpg",
        title: "Defiant Flora",
        subtitle: "Supporting Sample",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye, Devoré",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb and Pigment on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles5.jpg",
        title: "Defiant Flora",
        subtitle: "Supporting Sample",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles6.jpg",
        title: "Defiant Flora",
        subtitle: "Supporting Sample",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye, Devoré",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb and Pigment on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles7.jpg",
        title: "Defiant Flora",
        subtitle: "Supporting Sample",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye, Devoré",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb and Pigment on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles8.jpg",
        title: "Defiant Flora",
        subtitle: "Supporting Sample",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye",
        method: "Digitally Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles9.jpg",
        title: "Defiant Flora",
        subtitle: "Supporting Sample",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye, Devoré",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb and Pigment on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Thistles10.jpg",
        title: "Defiant Flora",
        subtitle: "Supporting Sample",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye, Devoré",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb and Pigment on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/painting.jpg",
        title: "Painting of a Thistle",
        subtitle: "Sketchbook Development",
        galleryGroup: "Defiant Flora",
        medium: "Reactive Dye",
        method: "Hand Painted",
        finishings: "—",
        substrate: "—",
        description:
          "Initial painting study of thistles, focusing on texture and shape to translate into print.",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/H2.jpg",
        title: "Heathered Hills",
        subtitle: "Supporting Sample",
        galleryGroup: "Heathered Hills",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/H3.jpg",
        title: "Heathered Hills",
        subtitle: "Supporting Sample",
        galleryGroup: "Heathered Hills",
        medium: "Reactive Dye, Devoré",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/H4.jpg",
        title: "Heathered Hills",
        subtitle: "Supporting Sample",
        galleryGroup: "Heathered Hills",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/H5.jpg",
        title: "Heathered Hills",
        subtitle: "Supporting Sample",
        galleryGroup: "Heathered Hills",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/H6.jpg",
        title: "Heathered Hills",
        subtitle: "Supporting Sample",
        galleryGroup: "Heathered Hills",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/H7.jpg",
        title: "Heathered Hills",
        subtitle: "Supporting Sample",
        galleryGroup: "Heathered Hills",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/H8.jpg",
        title: "Heathered Hills",
        subtitle: "Supporting Sample",
        galleryGroup: "Heathered Hills",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Hpainting.jpg",
        title: "Painting of Heathers",
        subtitle: "Sketchbook Development",
        galleryGroup: "Heathered Hills",
        medium: "Gouache",
        method: "Hand Painted",
        finishings: "—",
        substrate: "—",
        description:
          "Initial painting study of white and purple heather, focusing on texture and tone to translate into print.",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Hpainting2.jpg",
        title: "Abstract Heather 1",
        subtitle: "Sketchbook Development",
        galleryGroup: "Heathered Hills",
        medium: "Reactive Dye",
        method: "Hand Painted",
        finishings: "—",
        substrate: "—",
        description:
          "Painted with reactive dye, focusing on translating texture with use of brushstrokes, to stylize the form of the heather",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/Hpainting3.jpg",
        title: "Abstract Heather 2",
        subtitle: "Sketchbook Development",
        galleryGroup: "Heathered Hills",
        medium: "Reactive Dye",
        method: "Hand Painted",
        finishings: "—",
        substrate: "—",
        description:
          "Painted with reactive dye, focusing on translating texture with use of brushstrokes, to stylize the form of the heather",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/K2.jpg",
        title: "Waterbound",
        subtitle: "Supporting Sample",
        galleryGroup: "Waterbound",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/K3.jpg",
        title: "Waterbound",
        subtitle: "Supporting Sample",
        galleryGroup: "Waterbound",
        medium: "Reactive Dye, Devoré",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb and Pigment on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/K4.jpg",
        title: "Waterbound",
        subtitle: "Supporting Sample",
        galleryGroup: "Waterbound",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/K5.jpg",
        title: "Waterbound",
        subtitle: "Supporting Sample",
        galleryGroup: "Waterbound",
        medium: "Reactive Dye, Discharge",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/K6.jpg",
        title: "Waterbound",
        subtitle: "Supporting Sample",
        galleryGroup: "Waterbound",
        medium: "Reactive Dye",
        method: "Digitally Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/K7.jpg",
        title: "Waterbound",
        subtitle: "Supporting Sample",
        galleryGroup: "Waterbound",
        medium: "Reactive Dye",
        method: "Digitally Printed",
        finishings: "Bondaweb on Wallpaper",
        substrate: "Silk Satin Viscose Devoré",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/K8.jpg",
        title: "Waterbound",
        subtitle: "Sketchbook Development",
        galleryGroup: "Waterbound",
        medium: "Reactive Dye",
        method: "Hand Painted",
        finishings: "—",
        substrate: "—",
        description:
          "Interpretive painting using dye, to translate inky, watery marks. Using metal structure of Kelpie statues as visual imagery.",
      },
      {
        imagePath: "images/prints/talesOfLostWonder/K9.jpg",
        title: "Waterbound",
        subtitle: "Sketchbook Development",
        galleryGroup: "Waterbound",
        medium: "Reactive Dye",
        method: "Hand Painted, Manual Screen Printed",
        finishings: "—",
        substrate: "—",
        description:
          "Experimenting with printing within my sketchbook. Testing how dyes layered and changed when printed.",
      },
    ],
  },
  {
    id: "stories-set-in-stone",
    slug: "storiessetinstone",
    title: "Stories Set in Stone",
    subtitle: "Interiors Collection / Print / 2025",
    notes:
      "Development collection exploring the theme of Scottish mythology and folklore, experimenting with different print techniques and materials.",
    tags: ["Wallpaper", "Hand Painted", "Experimental"],
    galleryGroupOrder: ["Main Collection", "Paintings", "Experimentals", "Visualisations"],
    works: buildStoriesSetInStoneWorks(),
  },
  {
    id: "echoes-of-shetlands-settlers",
    slug: "echoesofshetlandssettlers",
    title: "Echoes of Shetland's Settlers",
    subtitle: "Fashion Collection / Print & Embellishment / 2025",
    notes:
      "Industry project partnering with Jamieson and Smith, exploring printing on woollen substrates, translating the heritage connection of viking settles in Scotland.",
    tags: ["Industry", "Heirloom", "Felted"],
    works: [
      {
        imagePath: "images/rotating_gallery/celticCross1.jpg",
        title: "Celtic Cross I",
        subtitle: "Fashion Collection / Print & Embellishment / 2025",
        ...defaultFashionWork,
      },
      {
        imagePath: "images/rotating_gallery/celticCross2.jpg",
        title: "Celtic Cross II",
        subtitle: "Fashion Collection / Print & Embellishment / 2025",
        ...defaultFashionWork,
      },
      {
        imagePath: "images/rotating_gallery/celticCross3.jpg",
        title: "Celtic Cross III",
        subtitle: "Fashion Collection / Print & Embellishment / 2025",
        ...defaultFashionWork,
      },
      {
        imagePath: "images/rotating_gallery/celticCross4.jpg",
        title: "Celtic Cross IV",
        subtitle: "Fashion Collection / Print & Embellishment / 2025",
        ...defaultFashionWork,
      },
      {
        imagePath: "images/rotating_gallery/celticCross5.jpg",
        title: "Celtic Cross V",
        subtitle: "Fashion Collection / Print & Embellishment / 2025",
        ...defaultFashionWork,
      },
    ],
  },
];

/** First N work image paths for portfolio grid cards and navbar thumbnails. */
export function getGridImagePaths(collection: PortfolioCollection, count = 3): string[] {
  return collection.works.slice(0, count).map((w) => w.imagePath);
}

export function getCollectionBySlug(slug: string | undefined): PortfolioCollection | undefined {
  if (!slug) return undefined;
  return PORTFOLIO_COLLECTIONS.find((c) => c.slug === slug);
}

export function getDetailWorks(collection: PortfolioCollection): PortfolioWork[] {
  return collection.works;
}

export type PortfolioGalleryGroup = {
  label: string;
  works: PortfolioWork[];
};

function getWorkGalleryLabels(work: PortfolioWork): string[] {
  if (work.galleryGroups?.length) return work.galleryGroups;
  if (work.galleryGroup) return [work.galleryGroup];
  return ["Other"];
}

/** Works grouped for the project page gallery (labels are not numbered). */
export function getGalleryGroups(collection: PortfolioCollection): PortfolioGalleryGroup[] {
  const hasGroups = collection.works.some((w) => w.galleryGroup || w.galleryGroups?.length);
  if (!hasGroups) {
    return collection.works.length > 0 ? [{ label: "Gallery", works: collection.works }] : [];
  }

  const byLabel = new Map<string, PortfolioWork[]>();
  for (const work of collection.works) {
    for (const label of getWorkGalleryLabels(work)) {
      const list = byLabel.get(label) ?? [];
      list.push(work);
      byLabel.set(label, list);
    }
  }

  const order =
    collection.galleryGroupOrder?.length
      ? collection.galleryGroupOrder
      : [...byLabel.keys()];

  return order
    .filter((label) => (byLabel.get(label)?.length ?? 0) > 0)
    .map((label) => ({ label, works: byLabel.get(label)! }));
}

/** @deprecated Use getDetailWorks — image URLs only */
export function getDetailImagePaths(collection: PortfolioCollection): string[] {
  return collection.works.map((w) => w.imagePath);
}
