  // Populate the conference list dynamically
  var conferenceList = document.getElementById("conference-list");
  var journalList = document.getElementById("journal-list");
  var talksList = document.getElementById("talks-list");
  var thesisList = document.getElementById("thesis-list");
  var project1List = document.getElementById("project1-list");
  var project2List = document.getElementById("project2-list");
  var project3List = document.getElementById("project3-list");
  
  
  var conferenceItems = [
    // Add more conference items on top as needed
    `<b>I. Perez Avellaneda</b>. <q>CFSpy: A Python Library for the Computation of Chen-Fliess Series</q>.
    <em>24th Annual Python in Science Conference</em>, Seattle, Washington, 2025. <a href="https://proceedings.scipy.org/articles/mfwm5796" target="_blank" class="bodylink"> [link]</a>`,
    `<b>I. Perez Avellaneda</b> and L. A. Duffaut Espinosa. <q>Backward and Inner Approximation of Output Reachable Sets via Chen-Fliess Series</q>.
    <em>59th Annual Allerton Conference on Communication, Control, and Computing</em>, 2023. <a href="https://ieeexplore.ieee.org/document/10313403" target="_blank" class="bodylink"> [link]</a>`,
    `L. A. Duffaut Espinosa, W.S. Gray and <b>I. Perez Avellaneda</b>. <q>Derivatives of Chen-Fliess Series with Applications to Optimal Control</q>.
    <em>62nd Conference on Decision and Control</em>, 2023. <a href="https://ieeexplore.ieee.org/document/10383539" target="_blank" class="bodylink"> [link]</a>`,
    `<b>I. Perez Avellaneda</b> and L. A. Duffaut Espinosa. <q>An Interval Arithmetic Approach to Input-Output Reachability</q>.
    <em>7th Conference on Control Technology and Applications</em>, Bridgetown, Barbados, 2023. <a href="https://ieeexplore.ieee.org/document/10253257" target="_blank" class="bodylink"> [link]</a>.`,
    `<b>I. Perez Avellaneda</b> and L. A. Duffaut Espinosa. <q>Output Reachability of Chen-Fliess series: A Newton-Raphson Approach</q>.
    <em>57th Annual Conference on Information Science and Systems</em>, Baltimore, Maryland, 2023, pp. 1-6. <a href="https://ieeexplore.ieee.org/document/10089740" target="_blank" class="bodylink"> [link]</a>`,
    `<b>I. Perez Avellaneda</b> and L. A. Duffaut Espinosa. <q>Reachability of Chen-Fliess series: A Gradient Descent Approach</q>.
    <em>58th Annual Allerton Conference on Communication, Control, and Computing</em>, Monticello, Illinois, 2022, pp. 1-7. <a href="https://ieeexplore.ieee.org/document/9929346" target="_blank" class="bodylink"> [link]</a>`,
    `<b>I. Perez Avellaneda</b> and L. A. Duffaut Espinosa. \"On Mixed-Monotonicity of Chen-Fliess series.\" <em>26th International Conference on System Theory, Control and Computing (ICSTCC), </em>Sinaia, Romania, 2022, pp. 98-103.  <a href="https://ieeexplore.ieee.org/document/9931830" target="_blank" class="bodylink"> [link]</a>`, 
  ];

  var JournalItems = [
    `<b>I. Perez Avellaneda</b> and L. A. Duffaut Espinosa and Francisco Rosales Marticorena. <q>Feedback Dynamic Control for Exiting a Debt-Induced Spiral in a Deterministic Keen Model</q>.
    <em>PLOS ONE</em>, 2023. <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0295859" target="_blank" class="bodylink"> [link]</a> 
    <a href="https://pubmed.ncbi.nlm.nih.gov/38335197/" target="_blank" class="bodylink"> [link]</a>`, 
    `<b>I. Perez Avellaneda</b> and L. A. Duffaut Espinosa. <q>Second-Order Optimization of Chen-Fliess Series for Input-Output Reachability</q>.
    <em>Systems and Control Letters</em>, 2023. under review. `,
    `<b>I. Perez Avellaneda</b> and L. A. Duffaut Espinosa. <q>Input-Output Overestimation of Reachable Sets with Chen-Fliess Series</q>.
    <em>Transactions on Automatic Control</em>, 2023. under review. `,
    ];

    var TalksItems = [
      `I. Perez Avellaneda, <q>The Problem of Address Matching: a Journey through NLP and AI</q>.
      <em>PyData 2025</em>, Seattle, Washington, November, 2025. (Forthcoming)
      `,
      `I. Perez Avellaneda, <q>CFSpy: a Python Library for the Computation of Chen-Fliess Series</q>.
      <em>SciPy 2025: 24th annual SciPy conference</em>, Tacoma, Washington, July 9th, 2025.<a href="https://cfp.scipy.org/scipy2025/talk/WDUNLN/" target="_blank" class="bodylink"> [link]</a>
      <a href="pdf/SciPy2025_Ivan_Perez_Avellaneda.pdf" target="_blank" class="bodylink"> [poster]</a>
      `,
      `I. Perez Avellaneda, <q>Data-Driven Reachability of Non-Linear Systems via Optimization of Chen-Fliess Series</q>.
      <em>ADEEM PUCP Talk</em>, March 12th, 2024.
      `,

      `I. Perez Avellaneda, <q>Reachability of nonlinear systems via Optimization of Chen-Fliess series</q>.
      <em>Old Dominion University ECE Graduate Seminar</em>, November 10th, 2023.
      `,
      
      `I. Perez Avellaneda, <q>Backward and Inner Approximation of Output Reachable sets via Chen-Fliess Series</q>.
      <em>58th Annual Allerton Conference on Communication, Control, and Computing</em>, Monticello, Illinois, September 29th, 2023. <a href="https://easychair.org/smart-program/Allerton2023/" target="_blank" class="bodylink"> [link]</a>
      `,
      
      `I. Perez Avellaneda, <q>An Interval Arithmetic Approach to Input-Output Reachability</q>.
      <em>7th Conference on Control Technology and Applications</em>, Bridgetown, Barbados, August 17, 2023. <a href="https://css.paperplaza.net/conferences/conferences/CCTA23/program/CCTA23_AuthorIndexWeb.html" target="_blank" class="bodylink"> [link]</a>
      <a href="pdf/CCTA_2023_presentation.pdf" target="_blank" class="bodylink"> [slides]</a>`,

      `I. Perez Avellaneda, <q>Optimization of Chen-Fliess Series and Output Reachability of Nonlinear Systems</q>.
      <em>Student Research Conference 2023</em>, Burlington, Vermont, April 19, 2023. <a href="https://www.uvm.edu/sites/default/files/Office-of-Fellowships-Opportunities-Undergraduate-Research/SRC2023/Morning_II_Session_Final.pdf" target="_blank" class="bodylink"> [link]</a>
      <a href="pdf/Ivan_Perez_SRC_poster.pdf" target="_blank" class="bodylink"> [poster]</a>`,
    

      `I. Perez Avellaneda, <q>Output Reachability of Chen-Fliess Series: a Newton-Raphson Approach</q>.
      <em>57th Annual Conference on Information Science and Systems</em>, Baltimore, Maryland, March 25, 2023. <a href="https://ciss.jhu.edu/optimization-systems-control-ii/" target="_blank" class="bodylink"> [link]</a>
      <a href="pdf/CISS_2023_presentation.pdf" target="_blank" class="bodylink"> [slides]</a>`,


      `I. Perez Avellaneda, <q>Private Debt Control in the Peruvian Economy for the Period 1991-2014</q>.
      <em>USMP XIII Conferencia Internacional: Retos y Desafíos de la Nueva Economía 2023</em>, Lima, Peru, February 21, 2023.<a href="https://usmp.edu.pe/escuela-profesional-de-economia-realizo-el-xiii-seminario-internacional-retos-y-desafios-de-la-nueva-economia-2023/" target="_blank" class="bodylink"> [link]</a>
      <a href="pdf/DebtControl23.pdf" target="_blank" class="bodylink"> [slides]</a>`,
    
    
      `I. Perez Avellaneda, <q>The Problem of Stationary Points of Chen-Fliess Series</q>.
      <em>Quebec-Vermont Number Theory Seminar (unQVNTS Vermont)</em>, Burlington, Vermont, January 19, 2023. <a href="https://www.uvm.edu/~unqvnts/" target="_blank" class="bodylink"> [link]</a>
      <a href="pdf/unQVNTS_presentation.pdf" target="_blank" class="bodylink"> [slides]</a>`,


      `I. Perez Avellaneda, <q>Nonlinear System Reachable Set Computation: Learning Approach with Chen-Fliess Series</q>.
      <em>UVM Computing Student Research Day 2022 (CSRD '22)</em>, Burlington, Vermont, September 23, 2022. <a href="https://www.uvm.edu/~jonaolap/csrd/2022.html" target="_blank" class="bodylink"> [link]</a>
      <a href="pdf/CSRD22.pdf" target="_blank" class="bodylink"> [slides]</a>`,
      
      
      `I. Perez Avellaneda, <q>On Mixed-Monotonicity of Chen-Fliess Series</q>.
      <em>26th International Conference on System Theory, Control and Computing (ICSTCC)</em>, Sinaia, Romania, October 19th, 2022.  <a href="https://controls.papercept.net/conferences/conferences/STCC22/program/STCC22_ContentListWeb_1.html#web1" target="_blank" class="bodylink"> [link]</a>
      <a href="pdf/ICSTC22.pdf" target="_blank" class="bodylink"> [slides]</a>`,
      
      `I. Perez Avellaneda, <q>Reachability of Chen-Fliess Series: A Gradient Descent Approach</q>.
      <em>58th Annual Allerton Conference on Communication, Control, and Computing</em>, Monticello, Illinois, September 28th, 2022. <a href="https://allerton.csl.illinois.edu/2022-58th-allerton-conference-on-communication-control-and-computing-papers/" target="_blank" class="bodylink"> [link]</a>
      <a href="pdf/Allerton22.pdf" target="_blank" class="bodylink"> [slides]</a>`,
      
      
      `I. Perez Avellaneda, <q>The Electrical Department to the Rescue of the Financial Market: Controlling Debt</q>.
      <em> UVM SCRAPS Seminar</em>, Burlington, Vermont, October 21, 2019. <a href="https://erikweis.github.io/scraps/" target="_blank" class="bodylink"> [link]</a>`,
      ];

      

      var ThesisItems = [
        `I. Perez Avellaneda, <q>Data-driven Reachability of Non-linear Systems via Optimization of Chen-Fliess Series</q>,
        Ph.D. dissertation, University of Vermont, Burlington, Vermont, 2023.<a href="https://scholarworks.uvm.edu/items/dcd38b5d-f211-452a-becb-6b42ee7765c8" target="_blank" class="bodylink"> [link]</a>`,

        `I. Perez Avellaneda, <q>Debt control with a non-linear dynamical model: an application to the Peruvian economy for the period 1991-2014</q>,
        M.Sc. thesis, Esc. de Posgr, Pontificia Universidad Católica del Perú, Lima, Perú, 2021.<a href="https://tesis.pucp.edu.pe/repositorio/handle/20.500.12404/21239" target="_blank" class="bodylink"> [link]</a>`,
        
        `I. Perez Avellaneda, <q>Associative property on the group of elliptic curves</q>.
        Lic. thesis, Fac. de Cs. e Ing., Pontificia Universidad Católica del Perú, Lima, Perú, 2017.<a href="https://tesis.pucp.edu.pe/repositorio/handle/20.500.12404/9696" target="_blank" class="bodylink"> [link]</a>`,
        ];


        var Project1Items=[
          conferenceItems[1],
          conferenceItems[2],
          conferenceItems[3],
          conferenceItems[4],
          JournalItems[1],
          JournalItems[2],
        ]

        var Project2Items=[
          conferenceItems[0],
          conferenceItems[2],
          conferenceItems[3],
          conferenceItems[4],
          JournalItems[1],
          JournalItems[2],
        ]

        var Project3Items=[
          ThesisItems[0],
          conferenceItems[0],
          JournalItems[1],
        ]
  
  for (var i = 0; i < conferenceItems.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerHTML = conferenceItems[i];
    conferenceList.appendChild(listItem);
  }
  

  for (var i = 0; i < JournalItems.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerHTML = JournalItems[i];
    journalList.appendChild(listItem);
  }

  for (var i = 0; i < ThesisItems.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerHTML = ThesisItems[i];
    thesisList.appendChild(listItem);
  }


  for (var i = 0; i < TalksItems.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerHTML = TalksItems[i];
    talksList.appendChild(listItem);
  }

  for (var i = 0; i < Project1Items.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerHTML = Project1Items[i];
    project1List.appendChild(listItem);
  }

  for (var i = 0; i < Project2Items.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerHTML = Project2Items[i];
    project2List.appendChild(listItem);
  }

  for (var i = 0; i < Project3Items.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerHTML = Project3Items[i];
    project3List.appendChild(listItem);
  }
