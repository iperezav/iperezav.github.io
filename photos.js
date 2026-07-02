const PHOTO_CREATOR = "Ivan Perez Avellaneda";
const PHOTO_COPYRIGHT = "Copyright Ivan Perez Avellaneda";

const photoAlbums = [
  {
    folder: "social/MLSS2026",
    title: "Machine Learning Summer School at Columbia University 2026",
    url: "https://cfe.columbia.edu/content/mlss2",
    keywords: "Ivan Perez Avellaneda, Machine Learning Summer School, Columbia University, MLSS 2026",
    images: [
      { file: "IvanPerezAvellanedaColumbia1.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia2.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia3.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia4.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia5.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia6.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia431.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia432.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia433.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia434.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia435.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia436.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia437.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia439.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia440.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia543.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia590.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia591.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia592.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia593.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia594.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbia595.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbiaLuisLamb.jpeg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaColumbiaEnricoSantus.jpeg", alt: "Ivan Perez Avellaneda" }
    ]
  },
  {
    folder: "social/GENIUSOlympiad2026",
    title: "GENIUS Olympiad at St. John Fisher University",
    url: "https://geniusolympiad.org/",
    keywords: "Ivan Perez Avellaneda, GENIUS Olympiad, St. John Fisher University, 2026",
    images: [
      { file: "IvanPerezAvellanedaGENIUSOlympiad2026.jpeg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaGENIUSOlympiad2026_2.jpg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaGENIUSOlympiad2026_3.jpg", alt: "Ivan Perez Avellaneda" }
    ]
  },
  {
    folder: "social/SciPy2025",
    title: "SciPy 2025 — 24th annual SciPy conference",
    url: "https://www.scipy2025.scipy.org/",
    keywords: "Ivan Perez Avellaneda, SciPy 2025, Python in Science, scientific computing, Tacoma",
    images: [
      { file: "IvanPerezAvellanedaSciPy2025.jpg", alt: "Ivan Perez Avellaneda" }
    ]
  },
  {
    folder: "social/Allerton2023",
    title: "2023 Allerton Conference (the 59th Annual Allerton Conference on Communication, Control, and Computing) University of Illinois Urbana-Champaign",
    url: "https://ieeecss.org/event/58th-annual-allerton-conference-communication-control-and-computing",
    keywords: "Ivan Perez Avellaneda, Allerton Conference, IEEE CSS, control, computing, 2023",
    images: [
      { file: "IvanPerezAvellanedaAllerton2023.jpeg", alt: "Ivan Perez Avellaneda" }
    ]
  },
  {
    folder: "social/CISS2023",
    title: "Conference on Information Sciences and Systems 2023 at John Hopkins University",
    url: "https://ciss.jhu.edu/wp-content/uploads/2022/05/CISS-2023-CFP-04-19-22.pdf",
    keywords: "Ivan Perez Avellaneda, CISS 2023, Johns Hopkins University, information sciences, systems, 2023",
    images: [
      { file: "IvanPerezAvellanedaCISS2023.jpeg", alt: "Ivan Perez Avellaneda" }
    ]
  },
  {
    folder: "social/CCTA2023",
    title: "2023 IEEE Conference on Control Technology and Applications (CCTA)",
    url: "https://ccta2023.ieeecss.org/",
    keywords: "Ivan Perez Avellaneda, CCTA 2023, IEEE, control technology, applications, 2023",
    images: [
      { file: "IvanPerezAvellanedaCCTA2023.jpeg", alt: "Ivan Perez Avellaneda" }
    ]
  },
  {
    folder: "social/MathLicense2016",
    title: "License Defense in Pure Mathematics 2016 at PUCP",
    keywords: "Ivan Perez Avellaneda, PUCP, pure mathematics, license defense, 2016",
    images: [
      { file: "IvanPerezAvellanedaMathLicense.jpeg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaMathLicense2.jpeg", alt: "Ivan Perez Avellaneda" },
      { file: "IvanPerezAvellanedaMathLicense3.jpeg", alt: "Ivan Perez Avellaneda" }
    ]
  }
];

function getPhotoMetadata(photo, album) {
  const title = photo.title || (photo.alt + " - " + album.title);
  const description = photo.description || (photo.alt + " at " + album.title);
  const keywords = photo.keywords || album.keywords;
  return {
    title: title,
    description: description,
    keywords: keywords,
    creator: photo.creator || PHOTO_CREATOR,
    copyright: photo.copyright || PHOTO_COPYRIGHT
  };
}

function renderPhotoAlbums() {
  const container = document.getElementById("photo-sections");
  if (!container) {
    return;
  }

  photoAlbums.forEach(function (album) {
    const section = document.createElement("section");
    section.className = "photo-section w3-padding-large";

    const heading = document.createElement("h2");
    heading.appendChild(document.createTextNode(album.title));
    if (album.url) {
      const titleLink = document.createElement("a");
      titleLink.href = album.url;
      titleLink.className = "bodylink";
      titleLink.target = "_blank";
      titleLink.rel = "noopener noreferrer";
      titleLink.textContent = " [link]";
      heading.appendChild(titleLink);
    }
    section.appendChild(heading);

    const divider = document.createElement("hr");
    section.appendChild(divider);

    const grid = document.createElement("div");
    grid.className = "photo-grid";

    album.images.forEach(function (photo) {
      const metadata = getPhotoMetadata(photo, album);
      const imagePath = "img/" + album.folder + "/" + photo.file;
      const link = document.createElement("a");
      link.href = imagePath;
      if (location.protocol !== "file:") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      const img = document.createElement("img");
      img.src = imagePath;
      img.alt = photo.alt;
      img.title = metadata.title;
      img.loading = "lazy";
      link.appendChild(img);
      grid.appendChild(link);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

document.addEventListener("DOMContentLoaded", renderPhotoAlbums);
