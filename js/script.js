const navigationItems = Array.from(document.querySelector('.navigation').children)
const rollableMenu = document.querySelector('.rollableMenu')

navigationItems.forEach((a) => {
  a.addEventListener('mouseover', () => {
    // Wine
    if (a.innerText == 'Vins') {
      clearRollableMenu(rollableMenu)
      const menuDivRegions = rollableMenu.appendChild(document.createElement('div'))
      menuDivRegions.classList.add('regions')
      const menuRegion = menuDivRegions.appendChild(document.createElement('p'))
      menuRegion.innerText = 'Régions'
      data.forEach((domain) => {
        if (domain.color.includes('Vins')) {
          if (
            menuDivRegions.innerText == '' ||
            menuDivRegions.lastChild.innerText != domain.location
          ) {
            const regionList = menuDivRegions.appendChild(document.createElement('a'))
            regionList.href = 'javascript:;'
            regionList.innerText = domain.location
            regionList.addEventListener('mouseover', () => {
              if (document.querySelector('.domains') == null) {
                const menuDivDomains = rollableMenu.appendChild(document.createElement('div'))
                menuDivDomains.classList.add('domains')
              } else {
                document.querySelector('.domains').innerText = ''
              }
              const menuDivDomains = document.querySelector('.domains')
              const menuDomains = menuDivDomains.appendChild(document.createElement('p'))
              menuDomains.innerText = 'Domaines'
              data.forEach((domain) => {
                if (regionList.innerText == domain.location && window.innerWidth <= 480) {
                  const domainItem = menuDivDomains.appendChild(document.createElement('a'))
                  domainItem.href = 'javascript:;'
                  domainItem.innerText = domain.id
                  const details = domainItem
                  addClickEvent(domain, details)
                } else if (regionList.innerText == domain.location && window.innerWidth > 480) {
                  const domainItem = menuDivDomains.appendChild(document.createElement('img'))
                  domainItem.href = 'javascript:;'
                  domainItem.src = domain.logo
                  domainItem.classList.add('domainLogo')
                  const details = domainItem
                  addClickEvent(domain, details)
                }
              })
            })
          }
        }
      })
    } // Champagne
    else if (a.innerText == 'Champagnes') {
      clearRollableMenu(rollableMenu)
      data.forEach((domain) => {
        if (domain.color.includes('Champagne')) {
          rollableMenu.classList.add('navResults')
          const details = rollableMenu.appendChild(document.createElement('a'))
          details.href = 'javascript:;'
          const detailsLogo = details.appendChild(document.createElement('img'))
          detailsLogo.src = domain.logo
          addClickEvent(domain, details)
        }
      })
    } // Spiritueux
    else if (a.innerText == 'Spiritueux') {
      clearRollableMenu(rollableMenu)
      data.forEach((domain) => {
        if (domain.color.includes('Spiritueux')) {
          rollableMenu.classList.add('navResults')
          const details = rollableMenu.appendChild(document.createElement('a'))
          details.href = 'javascript:;'
          const detailsLogo = details.appendChild(document.createElement('img'))
          detailsLogo.src = domain.logo
          addClickEvent(domain, details)
        }
      })
    } // Domaines
    else if (a.innerText == 'Domaines') {
      clearRollableMenu(rollableMenu)
      const orderedArray = []
      data.forEach((domain) => {
        orderedArray.push(domain.id)
      })
      const domainDetails = document.querySelector('.rollableMenu')
      orderArray(orderedArray, domainDetails, rollableMenu)
      const divTitle = domainDetails.appendChild(document.createElement('p'))
      divTitle.classList.add('choice')
      divTitle.innerText = 'Liste des Domaines: A-Z'
    } // Appellations
    else if (a.innerText == 'Appellations') {
      clearRollableMenu(rollableMenu)
      const domainDetails = document.querySelector('.rollableMenu')
      const orderedArray = []
      data.forEach((domain) => {
        domain.products.forEach((product) => {
          orderedArray.push(product)
        })
      })
      orderArray(orderedArray, domainDetails, rollableMenu)
      const divTitle = domainDetails.appendChild(document.createElement('p'))
      divTitle.classList.add('choice')
      divTitle.innerText = 'Liste des Appellations: A-Z'
    }
  })
})

document.querySelector('nav').addEventListener('mouseleave', () => {
  clearRollableMenu(rollableMenu)
})

function orderArray(orderedArray, domainDetails) {
  orderedArray = orderedArray.filter((empty) => empty != '')
  orderedArray = [...new Set(orderedArray)]
  orderedArray.sort()
  domainDetails.classList.add('list')
  orderedArray.forEach((orderedItem) => {
    const uniqueItem = rollableMenu.appendChild(document.createElement('a'))
    uniqueItem.href = 'javascript:;'
    uniqueItem.innerText = orderedItem
    uniqueItem.addEventListener('click', () => {
      clearRollableMenu(rollableMenu)
      data.forEach((domain) => {
        if (uniqueItem.innerText === domain.id) {
          details = uniqueItem
          addClickEvent(domain, details)
        } else {
          domainDetails.classList.add('navResults')
          domain.products.forEach((product) => {
            if (uniqueItem.innerText === product) {
              const details = domainDetails.appendChild(document.createElement('a'))
              details.href = 'javascript:;'
              const detailsLogo = details.appendChild(document.createElement('img'))
              detailsLogo.src = domain.logo
              addClickEvent(domain, details)
            }
          })
        }
      }),
        uniqueItem.click()
      if (rollableMenu.children.length == 1) {
        rollableMenu.lastElementChild.click()
      }
    })
  })
}

function clearRollableMenu(rollableMenu) {
  rollableMenu.innerText = ''
  rollableMenu.classList = 'rollableMenu'
}

function addClickEvent(domain, details) {
  details.addEventListener('click', () => {
    clearRollableMenu(rollableMenu)
    const domainResult = document.querySelector('.domainResult')
    if (domainResult != undefined) {
      domainResult.remove()
    }
    const hero = document.querySelector('.hero')
    const resultContainer = hero.appendChild(document.createElement('div'))
    resultContainer.classList.add('domainResult')
    const domainLogo = resultContainer.appendChild(document.createElement('img'))
    domainLogo.src = domain.logo
    const domainDetailsDiv = resultContainer.appendChild(document.createElement('div'))
    const domainName = domainDetailsDiv.appendChild(document.createElement('h1'))
    domainName.innerText = domain.id
    const domainTopo = domainDetailsDiv.appendChild(document.createElement('p'))
    if (domain.topo != '') {
      domainTopo.innerText = domain.topo
    } else {
      domainTopo.innerText = 'Texte manquant'
    }
    if (domain.web != '') {
      const domainLink = domainDetailsDiv.appendChild(document.createElement('a'))
      domainLink.classList.add('webSiteBTN')
      domainLink.innerText = 'Site Web'
      domainLink.href = domain.web
      domainLink.target = '_blank'
    }
    const domainCloseBtn = resultContainer.appendChild(document.createElement('i'))
    domainCloseBtn.classList.add('fas', 'fa-times')
    domainCloseBtn.addEventListener('click', () => {
      resultContainer.remove()
    })
  })
}

// Data
const data = [
  {
    location: 'Beaujolais',
    id: 'Domaine Dubost',
    products: ['Vins de Bourgogne'],
    color: ['Vins', 'Rouge'],
    logo: './img/logos/domaineDubost.webp',
    web: 'https://www.domainedubost.com/',
    topo: 'Connu également sous le nom de Domaine du Tracot, Jean-Paul Dubost est un viticulteur dynamique possédant des vignes sur plusieurs crus (Moulin-à-Vent, Fleurie, Brouilly, Morgon et Régnié). Il ne néglige pas pour autant l’appellation de base Beaujolais-Villages, produisant des vins toujours vigoureux et parfumés. Il est aujourd’hui épaulé par ses deux fils, Corentin et Joffrey.',
  },
  {
    location: 'Beaujolais',
    id: 'Château de Pizay',
    products: ['Morgon', 'Beaujolais', 'Bourgogne'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauPizay.webp',
    web: 'https://www.chateau-pizay.com',
    topo: 'Depuis le Moyen Age, les vins fins du Château de Pizay séduisent les amateurs de Beaujolais les plus exigeants. Élevés dans l’aristocratie des crus choisis, ses nobles descendants vinifiés dans le meilleur respect des traditions sont dégustés dans le monde entier.',
  },
  {
    location: 'Bordeaux',
    id: 'H. Cuvelier & Fils',
    products: ['Vins de Bordeaux'],
    color: ['Vins', 'Rouge'],
    logo: './img/logos/cuvelier.webp',
    web: 'https://www.cuvelier-bordeaux.com/',
    topo: 'H. Cuvelier & Fils, un voyage dans les grands vins de Bordeaux à travers l’un de leurs négociants et élaborateurs les plus réputés.',
  },
  {
    location: 'Bordeaux',
    id: 'Gironde et Gascogne',
    products: [''],
    color: ['Vins', 'Rouge'],
    logo: './img/logos/girondeEtGascogne.webp',
    web: 'https://www.gironde-et-gascogne.com/',
    topo: 'Propriétaires de deux grands châteaux dans le bordelais : le Château Ramage La Bâtisse AOC Haut Médoc Cru Bourgeois, régulièrement cité comme l’un des tous meilleurs de cette appellation et le Château de Belcier, AOC Castillon-Côtes de Bordeaux, faisant partie des 5 meilleurs Castillon-Côtes de Bordeaux (appellation qui jouxte Saint-Emilion).',
  },
  {
    location: 'Bordeaux',
    id: 'Château Tourteau Chollet',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/tourteauChollet.webp',
    topo: 'Depuis sa création vers 1760, le Château Tourteau Chollet bénéficie de la qualité de son terroir et est reconnu pour être un des plus grands crus de Graves dès 1943. Un terroir fabuleux : un plateau sablo graveleux de la troisième terrasse de la Garonne, où aime s’épanouir la vigne. Sur ce terroir imprégné par les senteurs boisées de la forêt Landaise, la propriété bénéficie, au cœur des Graves, d’une situation idyllique, pour produire des vins soyeux et gourmands, tout en élégance.',
    web: 'https://lesvignoblesdemaxime.com/',
    topo: 'Situé dans les Graves à Bordeaux sur un sous-sol argileux-sableux, Château Tourteau Chollet est une propriété familiale depuis 20 ans.',
  },
  {
    location: 'Bordeaux',
    id: 'Famille André Lurton',
    products: ['Pessac Leognan'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/vignobles-andre-lurton.webp',
    web: 'https://boutique.andrelurton.com/',
    topo: "Société familiale, notre groupe Les Vignobles André Lurton est actuellement l'une des entreprises viticoles les plus importantes du Bordelais. Son fondateur, André Lurton, était un viticulteur. La vigne fut sa raison de vivre pendant près de 70 ans. Il lui consacra une grande partie de sa vie et de son temps. Il la défendit ardemment et sut l'aimer comme seul pouvait l'aimer un homme né sur ce terroir.",
  },
  {
    location: 'Bourgogne',
    id: 'Domaines Devillard',
    products: ['Mercurey'],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/domainesDevillard.webp',
    web: 'http://www.domaines-devillard.com/',
    topo: "C'est une histoire qui s’écrit au pluriel, au fil des siècles et au gré des appellations. Une histoire de famille, passionnée et amoureuse du vignoble. Les Devillard sont propriétaires depuis plusieurs générations, de 4 domaines en Bourgogne, du Nord au Sud, de la Côte de Nuits au Mâconnais",
  },
  {
    location: 'Bourgogne',
    id: 'Domaine Nathalie & Gilles Fèvre',
    products: ['Chablis'],
    color: ['Vins', 'Blanc'],
    logo: './img/logos/domaineFevre.webp',
    web: 'https://www.nathalieetgillesfevre.com/',
    topo: "La famille FÈVRE est née il y a plusieurs siècles au cœur du vignoble de Chablis. En effet, nous avons d'ores et déjà pu établir notre arbre généalogique jusqu'en 1745. Notre famille a toujours travaillé dans le vignoble; certains étaient tonneliers (vers 1800), d'autres ont été pépiniéristes (vers 1900).",
  },
  {
    location: 'Bourgogne',
    id: 'Maison René Lamy',
    products: ['Vins de Bourgogne'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/lamy-Pillot-logo.webp',
    web: 'https://www.rene-lamy.fr/',
    topo: 'La Maison René Lamy est née en Juin 2004, à l’initiative du Domaine Lamy-Pillot, situé à Chassagne-Montrachet, en Côte de Beaune. Face à la demande accrue de clients cavistes et restaurateurs pour une offre de vins de Domaines, Karine et Daniel CADOT-LAMY, du Domaine Lamy-Pillot, ont fédéré une trentaine de domaines bourguignons afin de répondre à cette attente.',
  },
  {
    location: 'Champagne',
    id: 'Billecart-Salmon',
    products: ['Champagne'],
    color: ['Champagne'],
    logo: './img/logos/billecart-salmon.webp',
    web: 'https://www.champagne-billecart.fr',
    topo: 'De la côte des Blancs à la Montagne de Reims, en passant par la Vallée de la Marne, les vignes du champagne Billecart Salmon s’épanouissent sous le soleil champenois. Plus de 40 crus de la Champagne poussent dans un rayon de 20 kilomètres autour d’Épernay et, depuis plus de 200 ans, participent à la fabrication du champagne de la maison.',
  },
  {
    location: 'Champagne',
    id: 'Champagne Drappier',
    products: ['Champagne'],
    color: ['Champagne'],
    logo: './img/logos/DrappierLogo.webp',
    web: 'https://www.champagne-drappier.com',
    topo: "La Maison Drappier compte aujourd’hui sur 2 siècles d’histoire et de savoir-faire transmis sur huit générations pour nous offrir le meilleur de la Champagne. Tout a commencé en 1808 lorsque François Drappier s'installe à Urville et commence l’exploitation de la vigne. Il bénéficie d’un site exceptionnel pour développer son domaine dans l’enceinte d’une maison cistercienne qui comprend des caves voûtées construites en 1152 par Saint-Bernard, fondateur de l'abbaye de Clairvaux.",
  },
  {
    location: 'Corse',
    id: 'Domaine Vico',
    products: ['Vins de Corse'],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineVico.webp',
    web: 'https://domainevico.com/',
    topo: 'Quarante neuf hectares de schistes, basaltes, granites, galets roulés entre 260 et 360 mètres d’altitude au pied de sommets culminants à 2000 mètres. C’est ce terroir particulier et atypique des montagnes du centre Corse qui fait la spécificité des vins de nos terroirs mariant fraicheur et tension continentale à une certaine maturité méridionale.',
  },
  {
    location: 'Languedoc',
    id: 'Domaine de la Cendrillon',
    products: ['Corbières'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineCendrillon.webp',
    web: 'https://www.lacendrillon.fr',
    topo: 'Le Domaine de La Cendrillon est un domaine familial transmis de génération en génération depuis plus de 250 ans. Hubert Joyeux représente la 8ème génération. Situé en Corbières dans le Sud de la France tout près de Carcassonne et Narbonne, le domaine dispose de 50 ha.',
  },
  {
    location: 'Languedoc',
    id: 'Domaine Grand Chemin',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineGrandChemin.webp',
    web: 'https://www.domainegrandchemin.fr/',
    topo: "À seulement quelques kilomètres d'Uzès et d’Anduze, aux portes des Cévennes et du célèbre site du Pont du Gard, Jean Marc et Emmanuel Floutier vignerons indépendants, cultivent avec respect sur des sols argilo-calcaire, les 70 hectares de vignes transmis de génération en génération.",
  },
  {
    location: 'Languedoc',
    id: 'Domaine la Croix Chaptal',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/croixChaptal.webp',
    web: 'http://www.lacroixchaptal.com/',
    topo: "Près de Montpellier, le domaine est situé à l'ouest de la commune de Saint André de Sagonis dans le hameau du Cambous. Les 20 hectares de vignes, élevés sur des sols entièrement recouverts de galets roulés sont entourés de 10 ha de bois.",
  },
  {
    location: 'Languedoc',
    id: 'Puech-Haut',
    products: [''],
    color: ['Vins', 'Rouge'],
    logo: './img/logos/domaineBru.webp',
    web: 'https://puech-haut.com/',
    topo: 'Le château Puech Haut se résume en un homme : Gérard Bru. Un ambitieux qui a su mettre toutes les chances de son côté en croyant en son rêve. En seulement quelques années, ce domaine est devenu un incontournable et une référence dans le Languedoc.',
  },
  {
    location: 'Languedoc',
    id: 'Château de Fontenille',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauDeFontenille.webp',
    web: 'https://www.chateau-fontenille-boutique.com/',
    topo: "En 1290, le site de Fontenille, dans l'Entre-deux-Mers, possédait déjà des vignes. Alors rattaché à l'abbaye de la Sauve-Majeure, ce domaine au terroir argilo-siliceux est devenu autonome au XVIIes. Depuis 1998, il est conduit par Stéphane Defraine, à la tête de 49 ha de vignes dont 17 en blanc et 32 en rouge.",
  },
  {
    location: 'Languedoc',
    id: 'Anne de Joyeuse',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/AnneDeJoyeuse.webp',
    web: 'https://www.annedejoyeuse.fr/',
    topo: "Fondée en 1928, la Cave Anne de Joyeuse, qui tire son nom du favori d'Henri III, vous dévoile les trésors viticoles du Limoux et le savoir-faire de 500 vignerons.",
  },
  {
    location: 'Loire',
    id: 'Chateau de Parnay',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/LevronVincenot.webp',
    web: 'https://chateaudeparnay.fr/',
    topo: "Le Château de Parnay, vignoble historique d'Antoine Cristal est un fleuron de l'AOC Saumur-Champigny. La propriété est située en bordure de Loire, inscrite au Patrimoine mondiale de l'Unesco sur les terroirs argilo-calcaires les plus réputés de l'appellation. La famille VINCENOT y cultive avec passion 35 hectares de vignes aujourd'hui certifiées bio.",
  },
  {
    location: 'Loire',
    id: 'Domaine Filliatreau',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineFilliatreau.webp',
    web: 'https://www.domaine-filliatreau.com/',
    topo: 'La famille Filliatreau joue un rôle moteur dans la production des vins rouges du Saumurois. Le domaine s’affirme sur les plus grandes tables comme l’un des emblèmes du Val de Loire.',
  },
  {
    location: 'Loire',
    id: 'Domaine Laporte',
    products: ['Sancerre & Pouilly'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/DomaineLaporte.webp',
    web: 'https://www.laporte-sancerre.com/',
    topo: 'Créé en 1850, le Domaine Laporte s’étend sur 30 hectares au cœur de l’appellation Sancerre dans le Val de Loire. Il est la propriété de la famille Bourgeois depuis 1986.',
  },
  {
    location: 'Loire',
    id: 'Domaine Pierre Luneau-Papin',
    products: [''],
    color: ['Vins', 'Blanc'],
    logo: './img/logos/label-pierre-luneau-papin.webp',
    web: 'https://www.domaineluneaupapin.com/',
    topo: 'Le Domaine Luneau-Papin est situé à 20 kilomètres de Nantes au sud de la Loire. Le vignoble du Domaine Luneau-Papin couvre 40 hectares de vignes sur les coteaux ensoleillés du Sèvre et Maine.',
  },
  {
    location: 'Loire',
    id: 'Pascal & Alain Lorieux',
    products: ['St Nicolas de Bourgueil', 'Chinon'],
    color: ['Vins', 'Rosé', 'Rouge'],
    logo: './img/logos/logolorieux_1.webp',
    web: 'http://www.lorieux.fr/',
    topo: "À 40 minutes d'Angers se trouve le domaine de Pascal et Alain Lorieux. À quelques encablures de la rencontre entre la Loire et de la Vienne, l'exploitation viticole accueille les épicuriens.",
  },
  {
    location: 'Loire',
    id: 'Domaine Maison',
    products: ['Cheverny'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineMaison.webp',
    web: 'https://www.domainemaison.com/fr/index.php',
    topo: 'Certifié Terra Vitis est situé au cœur de l’appellation Cheverny. Il s’étend sur 73ha composés de 60% de cépages blancs (Sauvignon, Chardonnay) et de 40% de cépages rouges (Pinot Noir, Gamay). La vigne est conduite dans le respect du terroir et de l’environnement en privilégiant la qualité des raisins par une maîtrise des rendements.',
  },
  {
    location: 'Loire',
    id: 'Maison Saget La Perrière',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/sagetLaPerriere.webp',
    web: 'https://www.sagetlaperriere.fr/',
    topo: "C'est au cœur du village de Pouilly-sur -Loire que la famille Saget perpétue son savoir-faire depuis maintenant 9 générations. Fruit du regroupement des meilleures parcelles de la famille, le Domaine Saget s'étend sur des lieux dits prestigieux de l'appellation Pouilly Fumé.",
  },
  {
    location: 'Loire',
    id: 'Domaines Tatin',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domainesTatin.webp',
    web: 'https://www.domaines-tatin.com/',
    topo: "En plein Centre de la France entre le Cher et L'Indre, Les vignes des Domaines Tatin s’étendent sur les rives du Cher pour les Sauvignons blancs de Quincy et de bords de l'Arnon pour les Pinots noir, les Pinots gris et les Sauvignons blancs de Reuilly.",
  },
  {
    location: 'Provence',
    id: 'Château Pas du Cerf',
    products: ['Cotes de Provence'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauPasDuCerf.webp',
    web: 'https://www.pasducerf.com/',
    topo: 'Le Château Pas du Cerf est une exploitation viticole située sur la commune de La Londe les Maures, dans le département du Var, en région Provence Alpes Côte d’Azur. Le domaine produit des vins des trois robes.',
  },
  {
    location: 'Provence',
    id: 'Domaine de la Bégude',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineDeLaBegude.webp',
    web: 'https://domainedelabegude.fr/',
    topo: 'Exploitation familiale de près de 30 hectares, le Domaine de la Bégude a été repris par la famille Tari en 1996. Fils, petit-fils et arrière-petit-fils de propriétaires viticoles, Guillaume Tari a impulsé à La Bégude une politique à la fois novatrice et fidèle à la tradition.',
  },
  {
    location: 'Provence',
    id: 'Domaine de la Rouillère',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineRouilliere.webp',
    web: 'https://www.domainelarouillere.com/',
    topo: 'Situé au cœur de la presqu’île de Saint-Tropez, à cheval sur les communes de Gassin et Ramatuelle, le Domaine La Rouillère a été créé en 1900. Il s’étend sur 120 hectares dont 45 de vignes qui bénéficient d’un climat et d’un terroir exceptionnel.',
  },
  {
    location: 'Rhône',
    id: 'Yann Chave',
    products: ['Crozes Hermitage', 'Hermitage'],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/yannChaveLogo.webp',
    web: 'https://www.yannchave.com/',
    topo: 'Aujourd’hui, le domaine au cœur de l’appellation Crozes-Hermitage est constitué de 20 ha dont 1 ha 20 sur la mythique colline de l’Hermitage.',
  },
  {
    location: 'Rhône',
    id: 'Ames Complices',
    products: [''],
    color: ['Vins', 'Rouge'],
    logo: './img/logos/AmesComplices.webp',
    web: '',
    topo: 'Ames Complices Châteauneuf-du-Pape du Domaine Famille Maurel.',
  },
  {
    location: 'Rhône',
    id: 'Domaine de Beaurenard',
    products: [''],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineDeBeaurenard.webp',
    web: 'http://www.beaurenard.fr/',
    topo: 'Le Domaine de Beaurenard est un domaine familial depuis 7 générations à Châteauneuf-du-Pape, dans la Vallée du Rhônes.',
  },
  {
    location: 'Rhône',
    id: 'Domaine de la Mordorée',
    products: ['Vins du Rhône – Tavel'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineMordoree.webp',
    web: 'https://www.domaine-mordoree.com/',
    topo: 'Situé à Tavel, le Domaine de la Mordorée est une entreprise familiale créée en 1986 par Francis Delorme et son fils Christophe. Cette exploitation viticole regroupe un vignoble de 60 hectares en Vallée du Rhône Sud, et est morcelée en 40 parcelles réparties sur 8 communes.',
  },
  {
    location: 'Rhône',
    id: 'Domaine de Montvac',
    products: ['Vacqueyras & Gigondas'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineDeMontvac.webp',
    web: 'https://domainedemontvac.fr/',
    topo: 'Créé en 1860 la propriété se transmet de mère en fille, le Vignoble s’étend sur 3 appellations Vacqueyras Gigondas et Côtes du Rhône.Le domaine est conduit en culture Biologique avec une certification Ecocert.',
  },
  {
    location: 'Rhône',
    id: 'Domaine Saint Amant',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaine-saint-amant-logo.webp',
    web: 'https://www.domainesaintamant.com/',
    topo: 'Le domaine Saint Amant, situé au cœur des Dentelles de Montmirail, à 500 m d’altitude, dans l’appellation Beaumes-de-Venise, bénéficie d’un terroir sans equivalent : 14 hectares de petites parcelles en coteaux pentus, exposés au sud-est et balayés par le mistral, sur des sols de marnes et de calcaires du Trias, pauvres, secs et peu propices à la maladie ou aux parasites.',
  },
  {
    location: 'Rhône',
    id: 'Château de Nages',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateaudeNages.webp',
    web: 'https://www.chateaudenages.com/fr/',
    topo: "Implanté en terroir Rhodanien, le Château de Nages est le berceau de la famille Gassier. Aimée et respectée, cette terre est aujourd'hui exploitée en agriculture biologique par la 4ème génération en charge du domaine, afin d’en exprimer le meilleur !",
  },
  {
    location: 'Rhône',
    id: 'Domaine Lionel Faury',
    products: ['Vins du Rhône – St Joseph'],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/LionelFaury.webp',
    web: 'https://vins-lionel-faury.fr/',
    topo: 'Le domaine est situé à Chavanay, dans le hameau de La Ribaudy, berceau de la famille Faury. Lionel Faury cultive 18 hectares en appellations Condrieu, Saint-Joseph, Côte-Rôtie et en IGP Collines rhodaniennes.',
  },
  {
    location: 'Spiritueux',
    id: 'Dirum Dzama',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/dirumDzama.webp',
    web: 'https://dirum.eu/',
    topo: 'L’histoire des rhums Dzama commence en 1982 sur l’île de Nosy-Be à Madagascar. Lucien Fohine s’y installe et développe son activité à partir de la distillerie de Dzamandzar.',
  },
  {
    location: 'Spiritueux',
    id: 'Les Whiskies du Monde',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/whiskiesDuMonde.webp',
    web: 'https://www.whiskiesdumonde.fr/fr/',
    topo: 'Whiskies du Monde est un créateur, importateur et distributeur sélectif de spiritueux haut de gamme venant des quatre coins du monde.',
  },
  {
    location: 'Spiritueux',
    id: 'Pardela Spirits',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/pardelaSpirits.webp',
    web: 'https://www.pardelaspirits.fr/',
    topo: "Pardela Spirits c'est la volonté de réunir une gamme de spiritueux artisans (« craft spirits ») uniques, novateurs et qualitatifs sous une même entité.",
  },
  {
    location: 'Spiritueux',
    id: 'Moon Harbour',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/moonHarbor.webp',
    web: 'http://moonharbour.fr/',
    topo: 'Spiritueux premium élaboré sur un alambic exclusif haut de gamme construit localement, en une seule et unique distillation lente et méthodique.',
  },
  {
    location: 'Spiritueux',
    id: 'Raymond Ragnaud',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/raymondRagnaud.webp',
    web: 'https://www.raymondragnaud.fr/',
    topo: 'En 1860, la famille Raymond RAGNAUD possédait un petit vignoble en Grande Champagne, cru le plus prisé pour la qualité de ses eaux de vie, particulièrement apte au vieillissement, planté uniquement en Ugni-Blanc et Folle Blanche, meilleurs cépages du vignoble charentais.',
  },
  {
    location: 'Sud-Ouest',
    id: 'A Bisto de Nas',
    products: ['Vins du Sud Ouest'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/bistosDeNas.webp',
    web: 'https://www.abistodenas.com/',
    topo: 'A BISTO DE NAS, est une association qui regroupe huit vignerons et un artisan distillateur. Ils partagent tous et toutes la même philosophie du raisin et du vin avec un profond  respect de la nature et du fruit.',
  },
  {
    location: 'Sud-Ouest',
    id: 'Domaines Brumont',
    products: ['Vins du Sud Ouest'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domainesBrumont.webp',
    web: 'https://www.brumont.fr/',
    topo: "Depuis plus de 30 ans, le vigneron cultive l'art de la nuance sur ses différentes parcelles pour créer des vins d'exception. Cités par les plus grands dans les plus prestigieuses revues spécialisées, les vins d'Alain sortent du lot et proposent une complexité qui s'intensifie à la garde.",
  },
  {
    location: 'Sud-Ouest',
    id: 'Domaine Tariquet',
    products: ['Vins de Cotes de Gascogne'],
    color: ['Vins', 'Rosé', 'Blanc', 'Spiritueux'],
    logo: './img/logos/domaineTariquet.webp',
    web: 'http://www.tariquet.com/',
    topo: 'L’histoire commence en 1912, lorsque Jean-Pierre Artaud et son père, qui revenait des États-Unis, ont décidé d’acheter le domaine, dont les vignes ont été ravagées par le phylloxéra. Jean-Pierre, resté aux États-Unis, revient en France en 1914 pour défendre le pays.',
  },
]

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  loop: true,
  autoplay: {
    delay: 3500,
  },
  speed: 1000,
  centeredSlides: true,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    horizontalClass: 'swiper-pagination-horizontal',
    clickable: true,
  },
})

// Contact
const contact = document.querySelector('#contact')
contact.addEventListener('click', () => {
  clearRollableMenu(rollableMenu)
  const domainResult = document.querySelector('.domainResult')
  if (domainResult != undefined) {
    domainResult.remove()
  }
  const hero = document.querySelector('.hero')
  const resultContainer = hero.appendChild(document.createElement('div'))
  resultContainer.classList.add('domainResult')
  resultContainer.classList.add('contactDiv')
  const pierrickDiv = resultContainer.appendChild(document.createElement('div'))
  const pierrickIMG = pierrickDiv.appendChild(document.createElement('img'))
  pierrickIMG.src = './img/Pierrick.webp'
  const pierrickInnerDiv = pierrickDiv.appendChild(document.createElement('div'))
  const pierrickMail = pierrickInnerDiv.appendChild(document.createElement('a'))
  pierrickMail.innerText = 'Mail: pierrick.dinard@maisondinard.fr'
  pierrickMail.href = 'mailto:pierrick.dinard@maisondinard.fr'
  const pierrickTel = pierrickInnerDiv.appendChild(document.createElement('a'))
  pierrickTel.innerText = 'Tel: +33 (0)6 51 49 08 39'
  pierrickTel.href = 'callto:0651490839'
  const antoineDiv = resultContainer.appendChild(document.createElement('div'))
  const antoineIMG = antoineDiv.appendChild(document.createElement('img'))
  antoineIMG.src = './img/antoine.webp'
  const antoineInnerDiv = antoineDiv.appendChild(document.createElement('div'))
  const antoineMail = antoineInnerDiv.appendChild(document.createElement('a'))
  antoineMail.innerText = 'Mail: dinard.antoine@gmail.com'
  antoineMail.href = 'mailto:dinard.antoine@gmail.com'
  const antoineTel = antoineInnerDiv.appendChild(document.createElement('a'))
  antoineTel.innerText = 'Tel: +33 (0)7 81 45 32 70'
  antoineTel.href = 'callto:0781453270'
  const domainCloseBtn = resultContainer.appendChild(document.createElement('i'))
  domainCloseBtn.classList.add('fas', 'fa-times')
  domainCloseBtn.addEventListener('click', () => {
    resultContainer.remove()
  })
})

// About
const about = document.querySelector('#about')
about.addEventListener('click', () => {
  clearRollableMenu(rollableMenu)
  const domainResult = document.querySelector('.domainResult')
  if (domainResult != undefined) {
    domainResult.remove()
  }
  const hero = document.querySelector('.hero')
  const resultContainer = hero.appendChild(document.createElement('div'))
  resultContainer.classList.add('domainResult')
  resultContainer.classList.add('aboutDiv')
  const aboutIMG = resultContainer.appendChild(document.createElement('img'))
  aboutIMG.src = './img/pierrick.webp'
  const aboutInnerDiv = resultContainer.appendChild(document.createElement('div'))
  const aboutP1 = aboutInnerDiv.appendChild(document.createElement('p'))
  aboutP1.innerHTML =
    'Passionné par l’univers du vin et ayant une formation d’oenologie et de viticulture, <b>Pierrick Dinard</b> s’est installé en tant qu’agent commercial en vins, champagnes et spiritueux dans les Yvelines.'
  const aboutP2 = aboutInnerDiv.appendChild(document.createElement('p'))
  aboutP2.innerHTML =
    'L’agence commerciale a été créée en 2014 afin de distribuer sur les Yvelines des domaines et <b>des vins sélectionnés pour leur caractère authentique</b>.'
  const aboutP3 = aboutInnerDiv.appendChild(document.createElement('p'))
  aboutP3.innerHTML =
    'Il exerce son métier d’agent commercial avec passion pour répondre aux attentes des professionnels de la restauration et du goût ainsi que pour les cavistes indépendants dans les Yvelines et les Hauts de Seine. Son principal objectif est de <b>valoriser le travail des vignerons</b>.'
  const aboutP4 = aboutInnerDiv.appendChild(document.createElement('p'))
  aboutP4.innerHTML =
    'Ainsi il met en valeur des cuvées qui expriment un terroir et la personnalité des vignerons qui les ont élaborées. Il a choisi de collaborer avec des <b>vignerons respectueux de leur terroir</b>, avec notamment un large gamme de vins bio, vignerons qu’il visite et qu’il suit, dans un esprit de réel partenariat et de partage de savoir-vivre.'
  const contact = aboutInnerDiv.appendChild(document.createElement('a'))
  contact.innerText = 'Contactez-nous'
  contact.href = 'mailto:pierrick.dinard@maisondinard.fr'
  const domainCloseBtn = resultContainer.appendChild(document.createElement('i'))
  domainCloseBtn.classList.add('fas', 'fa-times')
  domainCloseBtn.addEventListener('click', () => {
    resultContainer.remove()
  })
})

// Logos Div logic
let swiperWrapper2 = document.querySelector('.swiper-wrapper2')
data.forEach((domain) => {
  const logoIMG = swiperWrapper2.appendChild(document.createElement('img'))
  logoIMG.src = domain.logo
  details = logoIMG
  logoIMG.classList.add('swiper-slide')
  addClickEvent(domain, details)
})

const swiper2 = new Swiper('.swiper2', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  centeredSlides: false,
  grabCursor: true,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
})
