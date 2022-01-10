const navigation = document.querySelector('.navigation')
const navigationItems = Array.from(navigation.children)
const rollableMenu = document.querySelector('.rollableMenu')

navigationItems.forEach((a) => {
  a.addEventListener('click', () => {
    // Wine
    if (a.innerText == 'Vins' && rollableMenu.innerText == '') {
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
            regionList.addEventListener('click', () => {
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
                if (regionList.innerText == domain.location) {
                  const domainItem = menuDivDomains.appendChild(document.createElement('a'))
                  domainItem.href = 'javascript:;'
                  domainItem.innerText = domain.id
                  domainItem.addEventListener('click', () => {
                    prepareDetails(rollableMenu)
                    const domainDetails = document.querySelector('.domainDetails')
                    source(domain, domainDetails)
                    const domainLogo = domainDetails.appendChild(document.createElement('img'))
                    domainLogo.src = domain.logo
                    const domainDetailsDiv = domainDetails.appendChild(
                      document.createElement('div')
                    )
                    const domainName = domainDetailsDiv.appendChild(document.createElement('h1'))
                    domainName.innerText = domain.id
                    const domainSpeech = domainDetailsDiv.appendChild(document.createElement('p'))
                    domainSpeech.innerText =
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis maiores quia repellat totam rem reprehenderit expedita et illum sit libero a, quasi nostrum, aperiam similique?'
                    if (domain.web != '') {
                      const domainLink = domainDetailsDiv.appendChild(document.createElement('a'))
                      domainLink.classList.add('domainLink')
                      domainLink.innerText = 'Site Web'
                      domainLink.href = domain.web
                    }
                  })
                }
              })
            })
          }
        }
      })
    } // Champagne
    else if (a.innerText == 'Champagnes') {
      prepareDetails(rollableMenu)
      const domainDetails = document.querySelector('.domainDetails')
      data.forEach((domain) => {
        if (domain.color.includes('Champagne')) {
          const details = domainDetails.appendChild(document.createElement('a'))
          details.href = 'javascript:;'
          const detailsLogo = details.appendChild(document.createElement('img'))
          detailsLogo.src = domain.logo
          addClickEvent(domain, details)
        }
      })
    } // Spiritueux
    else if (a.innerText == 'Spiritueux') {
      prepareDetails(rollableMenu)
      const domainDetails = document.querySelector('.domainDetails')
      data.forEach((domain) => {
        if (domain.color.includes('Spiritueux')) {
          const details = domainDetails.appendChild(document.createElement('a'))
          details.href = 'javascript:;'
          const detailsLogo = details.appendChild(document.createElement('img'))
          detailsLogo.src = domain.logo
          addClickEvent(domain, details)
        }
      })
    } // Domaines
    else if (a.innerText == 'Domaines') {
      prepareDetails(rollableMenu)
      const orderedArray = []
      data.forEach((domain) => {
        orderedArray.push(domain.id)
      })
      const domainDetails = document.querySelector('.domainDetails')
      orderArray(orderedArray, domainDetails, rollableMenu)
      const divTitle = domainDetails.appendChild(document.createElement('p'))
      divTitle.classList.add('choice')
      divTitle.innerText = 'Liste des Domaines: A-Z'
    } // Appellations
    else if (a.innerText == 'Appellations') {
      prepareDetails(rollableMenu)
      const domainDetails = document.querySelector('.domainDetails')
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
    } else {
      console.log('Error')
      rollableMenu.innerText = ''
    }
  })
})

function orderArray(orderedArray, domainDetails, rollableMenu) {
  orderedArray = orderedArray.filter((empty) => empty != '')
  orderedArray = [...new Set(orderedArray)]
  orderedArray.sort()
  domainDetails.classList.add('list')
  orderedArray.forEach((orderedItem) => {
    const uniqueItem = domainDetails.appendChild(document.createElement('a'))
    uniqueItem.href = 'javascript:;'
    uniqueItem.innerText = orderedItem
    uniqueItem.addEventListener('click', () => {
      prepareDetails(rollableMenu)
      data.forEach((domain) => {
        if (uniqueItem.innerText === domain.id) {
          details = uniqueItem
          addClickEvent(domain, details)
        } else {
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
      if (domainDetails.children.length == 2) {
        domainDetails.lastElementChild.click()
      }
    })
  })
}

function prepareDetails(rollableMenu) {
  rollableMenu.innerText = ''
  const hero = document.querySelector('.hero')
  if (hero.lastElementChild.classList.contains('swiper-pagination')) {
    const domainDetails = hero.appendChild(document.createElement('div'))
    domainDetails.classList.add('domainDetails')
  }
  const domainDetails = document.querySelector('.domainDetails')
  domainDetails.classList.remove('appellations')
  domainDetails.classList.remove('aboutDiv')
  domainDetails.classList.remove('list')
  domainDetails.textContent = ''
  const domainCloseBtn = domainDetails.appendChild(document.createElement('i'))
  domainCloseBtn.classList.add('fas', 'fa-times')
  domainCloseBtn.addEventListener('click', () => {
    domainDetails.remove()
  })
  const retour = domainCloseBtn.appendChild(document.createElement('p'))
  // retour.innerText = 'Retour'
}

function addClickEvent(domain, details) {
  details.addEventListener('click', () => {
    prepareDetails(rollableMenu)
    const domainDetails = document.querySelector('.domainDetails')
    source(domain, domainDetails)
    const domainLogo = domainDetails.appendChild(document.createElement('img'))
    domainLogo.src = domain.logo
    const domainDetailsDiv = domainDetails.appendChild(document.createElement('div'))
    const domainName = domainDetailsDiv.appendChild(document.createElement('h1'))
    domainName.innerText = domain.id
    const domainSpeech = domainDetailsDiv.appendChild(document.createElement('p'))
    domainSpeech.innerText =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis maiores quia repellat totam rem reprehenderit expedita et illum sit libero a, quasi nostrum, aperiam similique?'
    if (domain.web != '') {
      const domainLink = domainDetailsDiv.appendChild(document.createElement('a'))
      domainLink.classList.add('webSiteBTN')
      domainLink.innerText = 'Site Web'
      domainLink.href = domain.web
      domainLink.target = '_blank'
    }
  })
}

// Show source
function source(domain, domainDetails) {
  const source = domainDetails.appendChild(document.createElement('div'))
  source.classList.add('source')
  const sourceDetails = source.appendChild(document.createElement('p'))
  if (domain.products != undefined) {
    if (domain.color[0] != domain.products && domain.products != '') {
      if (domain.id == 'Domaine Tariquet') {
        sourceDetails.innerText = `${domain.color[0]} > ${domain.products} & ${
          domain.color[domain.color.length - 1]
        } > ${domain.id}`
      } else {
        sourceDetails.innerText = `${domain.color[0]} > ${domain.products[0]} > ${domain.id}`
      }
    } else {
      sourceDetails.innerText = `${domain.color[0]} > ${domain.id}`
    }
  } else {
    sourceDetails.innerText = `${domain.color[0]} > ${domain.id}`
  }
}

// Data
const data = [
  {
    location: 'Beaujolais',
    id: 'Domaine Dubost',
    products: ['Vins de Bourgogne'],
    color: ['Vins', 'Rouge'],
    logo: '',
    web: '',
  },
  {
    location: 'Beaujolais',
    id: 'Château de Pizay',
    products: ['Morgon', 'Beaujolais', 'Bourgogne'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauPizay.webp',
    web: 'https://www.chateau-pizay.com/fr',
  },
  {
    location: 'Bordeaux',
    id: 'H. Cuvelier & Fils',
    products: ['Vins de Bordeaux'],
    color: ['Vins', 'Rouge'],
    logo: './img/logos/cuvelier.webp',
    web: 'https://www.cuvelier-bordeaux.com/',
  },
  {
    location: 'Bordeaux',
    id: 'Domaines Select',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: '',
    web: '',
  },
  {
    location: 'Bordeaux',
    id: 'Gironde et Gascogne',
    products: [''],
    color: ['Vins', 'Rouge'],
    logo: './img/logos/girondeEtGascogne.webp',
    web: 'https://www.gironde-et-gascogne.com/',
  },
  {
    location: 'Bordeaux',
    id: 'Château Tourteau Chollet',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/tourteauChollet.webp',
    web: '',
  },
  {
    location: 'Bordeaux',
    id: 'Famille André Lurton',
    products: ['AOC Pessac Leognan'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/vignobles-andre-lurton.webp',
    web: 'https://boutique.andrelurton.com/',
  },
  {
    location: 'Bourgogne',
    id: 'Domaines Devillard',
    products: ['AOC Mercurey'],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/domainesDevillard.webp',
    web: 'http://www.domaines-devillard.com/',
  },
  {
    location: 'Bourgogne',
    id: 'Domaine Nathalie & Gilles Fèvre',
    products: ['AOC Chablis'],
    color: ['Vins', 'Blanc'],
    logo: './img/logos/domaineFevre.webp',
    web: 'https://www.nathalieetgillesfevre.com/',
  },
  {
    location: 'Bourgogne',
    id: 'Maison René Lamy',
    products: ['Vins de Bourgogne'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/lamy-Pillot-logo.webp',
    web: 'https://www.rene-lamy.fr/',
  },
  {
    location: 'Champagne',
    id: 'Billecart-Salmon',
    products: ['Champagne'],
    color: ['Champagne'],
    logo: './img/logos/billecart-salmon.webp',
    web: 'https://www.champagne-billecart.fr/fr/verification-age-legal?locale=fr',
  },
  {
    location: 'Champagne',
    id: 'Champagne Drappier',
    products: ['Champagne'],
    color: ['Champagne'],
    logo: './img/logos/DrappierLogo.webp',
    web: 'https://www.champagne-drappier.com/fr/',
  },
  {
    location: 'Corse',
    id: 'Domaine Vico',
    products: ['Vins de Corse'],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineVico.webp',
    web: 'https://domainevico.com/',
  },
  {
    location: 'Languedoc',
    id: 'Domaine de la Cendrillon',
    products: ['AOC Corbières'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineCendrillon.webp',
    web: 'https://www.lacendrillon.fr/en/',
  },
  {
    location: 'Languedoc',
    id: 'Domaine Grand Chemin',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineGrandChemin.webp',
    web: 'https://www.domainegrandchemin.fr/',
  },
  {
    location: 'Languedoc',
    id: 'Domaine la Croix Chaptal',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/croixChaptal.webp',
    web: 'http://www.lacroixchaptal.com/',
  },
  {
    location: 'Languedoc',
    id: 'Domaines Bru',
    products: [''],
    color: ['Vins', 'Rouge'],
    logo: './img/logos/domaineBru.webp',
    web: 'https://www.domainemylenebru.fr/',
  },
  {
    location: 'Languedoc',
    id: 'Château de Fontenille',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauDeFontenille.webp',
    web: 'https://www.chateau-fontenille-boutique.com/',
  },
  {
    location: 'Languedoc',
    id: 'Anne de Joyeuse',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/AnneDeJoyeuse.webp',
    web: 'https://www.annedejoyeuse.fr/',
  },
  {
    location: 'Loire',
    id: 'Levron & Vincenot',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/LevronVincenot.webp',
    web: 'https://chateaudeparnay.fr/',
  },
  {
    location: 'Loire',
    id: 'Domaine Filliatreau',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineFilliatreau.webp',
    web: 'https://www.domaine-filliatreau.com/',
  },
  {
    location: 'Loire',
    id: 'Domaine Laporte',
    products: ['AOC Sancerre & Pouilly'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/DomaineLaporte.webp',
    web: 'https://www.laporte-sancerre.com/',
  },
  {
    location: 'Loire',
    id: 'Domaine Pierre Luneau-Papin',
    products: [''],
    color: ['Vins', 'Blanc'],
    logo: './img/logos/label-pierre-luneau-papin.webp',
    web: 'https://www.domaineluneaupapin.com/',
  },
  {
    location: 'Loire',
    id: 'Lorieux Alain & Pascal',
    products: ['AOC St Nicolas de Bourgueil', 'Chinon'],
    color: ['Vins', 'Rosé', 'Rouge'],
    logo: './img/logos/logolorieux_1.webp',
    web: 'http://www.lorieux.fr/',
  },
  {
    location: 'Loire',
    id: 'Domaine Maison Père & Fils',
    products: ['AOC Cheverny'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineMaison.webp',
    web: 'https://www.domainemaison.com/fr/index.php',
  },
  {
    location: 'Loire',
    id: 'Saget La Perrière',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/sagetLaPerriere.webp',
    web: 'https://www.sagetlaperriere.fr/',
  },
  {
    location: 'Loire',
    id: 'Domaines Tatin',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domainesTatin.webp',
    web: 'https://www.domaines-tatin.com/',
  },
  {
    location: 'Provence',
    id: 'Château Pas du Cerf',
    products: ['AOC Cotes de Provence'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauPasDuCerf.webp',
    web: 'https://www.pasducerf.com/',
  },
  {
    location: 'Provence',
    id: 'Domaine de la Bégude',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineDeLaBegude.webp',
    web: 'https://domainedelabegude.fr/',
  },
  {
    location: 'Provence',
    id: 'Domaine la Rouillère',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineRouilliere.webp',
    web: 'https://www.domainelarouillere.com/',
  },
  {
    location: 'Rhône',
    id: 'Yann Chave',
    products: ['Crozes Hermitage', 'Hermitage'],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/yannChaveLogo.webp',
    web: 'https://www.yannchave.com/',
  },
  {
    location: 'Rhône',
    id: 'Ames Complices',
    products: [''],
    color: ['Vins', 'Rouge'],
    logo: './img/logos/AmesComplices.webp',
    web: '',
  },
  {
    location: 'Rhône',
    id: 'Domaine de Beaurenard',
    products: [''],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineDeBeaurenard.webp',
    web: 'http://www.beaurenard.fr/',
  },
  {
    location: 'Rhône',
    id: 'Domaine de la Mordorée',
    products: ['Vins du Rhône – AOC Tavel'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineMordoree.webp',
    web: 'https://www.domaine-mordoree.com/',
  },
  {
    location: 'Rhône',
    id: 'Domaine de Montvac',
    products: ['AOC Vacqueyras & Gigondas'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineDeMontvac.webp',
    web: 'https://domainedemontvac.fr/',
  },
  {
    location: 'Rhône',
    id: 'Domaine Saint Amant',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaine-saint-amant-logo.webp',
    web: 'https://www.domainesaintamant.com/',
  },
  {
    location: 'Rhône',
    id: 'Château de Nages',
    products: [''],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateaudeNages.webp',
    web: 'https://www.chateaudenages.com/fr/',
  },
  {
    location: 'Rhône',
    id: 'Domaine Lionel Faury',
    products: ['Vins du Rhône – St Joseph'],
    color: ['Vins', 'Rouge', 'Blanc'],
    logo: './img/logos/LionelFaury.webp',
    web: 'https://vins-lionel-faury.fr/',
  },
  {
    location: 'Spiritueux',
    id: 'Dirum Dzama',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/dirumDzama.webp',
    web: '',
  },
  {
    location: 'Spiritueux',
    id: 'Les Whiskies du Monde',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/whiskiesDuMonde.webp',
    web: 'https://www.whiskiesdumonde.fr/fr/',
  },
  {
    location: 'Spiritueux',
    id: 'Pardela Spirits',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/pardelaSpirits.webp',
    web: 'https://www.pardelaspirits.fr/',
  },
  {
    location: 'Spiritueux',
    id: 'Moon Harbour',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/moonHarbor.webp',
    web: 'http://moonharbour.fr/',
  },
  {
    location: 'Spiritueux',
    id: 'Raymond Ragnaud',
    products: ['Spiritueux'],
    color: ['Spiritueux'],
    logo: './img/logos/raymondRagnaud.webp',
    web: '',
  },
  {
    location: 'Sud-Ouest',
    id: 'Bisto de Nas',
    products: ['Vins du Sud Ouest'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/bistosDeNas.webp',
    web: 'https://www.abistodenas.com/',
  },
  {
    location: 'Sud-Ouest',
    id: 'Domaines Brumont',
    products: ['Vins du Sud Ouest'],
    color: ['Vins', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domainesBrumont.webp',
    web: 'https://www.brumont.fr/',
  },
  {
    location: 'Sud-Ouest',
    id: 'Domaine Tariquet',
    products: ['Vins de Cotes de Gascogne'],
    color: ['Vins', 'Rosé', 'Blanc', 'Spiritueux'],
    logo: './img/logos/domaineTariquet.webp',
    web: 'http://www.tariquet.com/',
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

// About
const about = document.querySelector('#about')
about.addEventListener('click', () => {
  prepareDetails(rollableMenu)
  const domainDetails = document.querySelector('.domainDetails')
  domainDetails.classList.add('aboutDiv')
  const aboutIMG = domainDetails.appendChild(document.createElement('img'))
  aboutIMG.src = './img/pierrick.jpg'
  const aboutInnerDiv = domainDetails.appendChild(document.createElement('div'))
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
  contact.addEventListener('click', () => {})
})

// Logos Div logic
const domainsArray = []
data.forEach((domain) => {
  domainsArray.push(domain.id)
})
const popularLogos = [
  data[domainsArray.indexOf('Domaines Brumont')],
  data[domainsArray.indexOf('Domaine Tariquet')],
  data[domainsArray.indexOf('Champagne Drappier')],
  data[domainsArray.indexOf('Billecart-Salmon')],
  data[domainsArray.indexOf('Domaine de la Cendrillon')],
  data[domainsArray.indexOf('H. Cuvelier & Fils')],
  data[domainsArray.indexOf('Château de Nages')],
]
const news = document.querySelector('.news')
const logosDiv = document.body.insertBefore(document.createElement('div'), news)
logosDiv.classList.add('logosDiv')
popularLogos.forEach((domain) => {
  const logoIMG = logosDiv.appendChild(document.createElement('img'))
  logoIMG.src = domain.logo
  details = logoIMG
  addClickEvent(domain, details)
})
