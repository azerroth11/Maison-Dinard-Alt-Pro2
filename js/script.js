const navigation = document.querySelector('.navigation')
const navigationItems = Array.from(navigation.children)

navigationItems.forEach((a) => {
  a.addEventListener('click', () => {
    const rollableMenu = document.querySelector('.rollableMenu')
    if (a.innerText == 'Vins' && rollableMenu.innerText == '') {
      const menuDivRegions = rollableMenu.appendChild(document.createElement('div'))
      menuDivRegions.classList.add('regions')
      const menuRegion = menuDivRegions.appendChild(document.createElement('p'))
      menuRegion.innerText = 'Régions'
      data.forEach((domain) => {
        if (domain.color.includes('Vin')) {
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
                    const domainLink = domainDetailsDiv.appendChild(document.createElement('a'))
                    domainLink.classList.add('domainLink')
                    domainLink.innerText = 'Site Web'
                    domainLink.href = 'javascript:;'
                  })
                }
              })
            })
          }
        }
      })
    } else if (a.innerText == 'Champagnes') {
      prepareDetails(rollableMenu)
      const domainDetails = document.querySelector('.domainDetails')
      data.forEach((domain) => {
        if (domain.color.includes('Champagne')) {
          createDetails(domain, domainDetails)
        }
      })
    } else if (a.innerText == 'Spiritueux') {
      prepareDetails(rollableMenu)
      const domainDetails = document.querySelector('.domainDetails')
      data.forEach((domain) => {
        if (domain.color.includes('Spiritueux')) {
          createDetails(domain, domainDetails)
        }
      })
    } else if (a.innerText == 'Domaines') {
      prepareDetails(rollableMenu)
      const domainDetails = document.querySelector('.domainDetails')
      data.forEach((domain) => {
        createDetails(domain, domainDetails)
      })
    } else if (a.innerText == 'Appellations') {
      prepareDetails(rollableMenu)
      const domainDetails = document.querySelector('.domainDetails')
      domainDetails.classList.add('appellations')
      const productsArray = []
      data.forEach((domain) => {
        if (domain.products != undefined) {
          domain.products.forEach((product) => {
            productsArray.push(product)
          })
        }
      })
      productsArray.forEach((product) => {
        if (product != domainDetails.lastChild.innerText) {
          const details = domainDetails.appendChild(document.createElement('a'))
          details.href = 'javascript:;'
          details.innerText = product
          details.addEventListener('click', () => {
            domainDetails.classList.remove('appellations')
            prepareDetails(rollableMenu)
            data.forEach((domain) => {
              console.log(domain.products)
              if (domain.products == product) {
                createDetails(domain, domainDetails)
              }
            })
          })
        }
      })
    } else {
      rollableMenu.innerText = ''
    }
  })
})

function prepareDetails(rollableMenu) {
  rollableMenu.innerText = ''
  const hero = document.querySelector('.hero')
  if (hero.lastElementChild.classList.contains('swiper-pagination')) {
    const domainDetails = hero.appendChild(document.createElement('div'))
    domainDetails.classList.add('domainDetails')
  }
  const domainDetails = document.querySelector('.domainDetails')
  domainDetails.textContent = ''
  const domainCloseBtn = domainDetails.appendChild(document.createElement('i'))
  domainCloseBtn.classList.add('fas', 'fa-times')
  domainCloseBtn.addEventListener('click', () => {
    domainDetails.remove()
  })
}

function createDetails(domain, domainDetails) {
  const details = domainDetails.appendChild(document.createElement('a'))
  details.href = 'javascript:;'
  const detailsLogo = details.appendChild(document.createElement('img'))
  detailsLogo.src = domain.logo
  details.addEventListener('click', () => {
    domainDetails.textContent = ''
    const domainLogo = domainDetails.appendChild(document.createElement('img'))
    domainLogo.src = domain.logo
    const domainDetailsDiv = domainDetails.appendChild(document.createElement('div'))
    const domainName = domainDetailsDiv.appendChild(document.createElement('h1'))
    domainName.innerText = domain.id
    const domainSpeech = domainDetailsDiv.appendChild(document.createElement('p'))
    domainSpeech.innerText =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis maiores quia repellat totam rem reprehenderit expedita et illum sit libero a, quasi nostrum, aperiam similique?'
    const domainLink = domainDetailsDiv.appendChild(document.createElement('a'))
    domainLink.classList.add('domainLink')
    domainLink.innerText = 'Site Web'
    domainLink.href = 'javascript:;'
    const domainCloseBtn = domainDetailsDiv.appendChild(document.createElement('i'))
    domainCloseBtn.classList.add('fas', 'fa-times')
    domainCloseBtn.addEventListener('click', () => {
      domainDetails.remove()
    })
  })
}

// Data
const data = [
  {
    location: 'BEAUJOLAIS',
    id: 'Domaine Dubost',
    products: ['Vins de Bourgogne'],
    color: ['Vin', 'Rouge'],
    logo: '',
  },
  {
    location: 'BEAUJOLAIS',
    id: 'Château de Pizay',
    products: ['Morgon', 'Beaujolais', 'Bourgogne'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauPizay.webp',
  },
  {
    location: 'BORDEAUX',
    id: 'H. Cuvelier & Fils',
    products: ['Vins de Bordeaux'],
    color: ['Vin', 'Rouge'],
    logo: './img/logos/cuvelier.webp',
  },
  {
    location: 'BORDEAUX',
    id: 'Domaines Select',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: '',
  },
  {
    location: 'BORDEAUX',
    id: 'Gironde et Gascogne',
    color: ['Rouge'],
    logo: './img/logos/girondeEtGascogne.webp',
  },
  {
    location: 'BORDEAUX',
    id: 'Château Tourteau Chollet',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/tourteauChollet.webp',
  },
  {
    location: 'BORDEAUX',
    id: 'Famille André Lurton',
    products: ['AOC Pessac Leognan'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/vignobles-andre-lurton.webp',
  },
  {
    location: 'BOURGOGNE',
    id: 'Domaines Devillard',
    products: ['AOC Mercurey'],
    color: ['Vin', 'Rouge', 'Blanc'],
    logo: './img/logos/domainesDevillard.webp',
  },
  {
    location: 'BOURGOGNE',
    id: 'Domaine Nathalie & Gilles Fèvre',
    products: ['AOC Chablis'],
    color: ['Vin', 'Blanc'],
    logo: './img/logos/domaineFevre.webp',
  },
  {
    location: 'BOURGOGNE',
    id: 'Maison René Lamy',
    products: ['Vins de Bourgogne'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/lamy-Pillot-logo.webp',
  },
  {
    location: 'CHAMPAGNE',
    id: 'Billecart-Salmon',
    products: ['Champagne'],
    color: ['Champagne'],
    logo: './img/logos/billecart-salmon.webp',
  },
  {
    location: 'CHAMPAGNE',
    id: 'Champagne Drappier',
    products: ['Champagne'],
    color: ['Champagne'],
    logo: './img/logos/DrappierLogo.webp',
  },
  {
    location: 'CORSE',
    id: 'Domaine Vico',
    products: ['Vins de Corse'],
    color: ['Vin', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineVico.webp',
  },
  {
    location: 'LANGUEDOC',
    id: 'Domaine de la Cendrillon',
    products: ['AOC Corbières'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineCendrillon.webp',
  },
  {
    location: 'LANGUEDOC',
    id: 'Domaine Grand Chemin',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineGrandChemin.webp',
  },
  {
    location: 'LANGUEDOC',
    id: 'Domaine la Croix Chaptal',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/croixChaptal.webp',
  },
  {
    location: 'LANGUEDOC',
    id: 'Domaines Bru',
    color: ['Vin', 'Rouge'],
    logo: './img/logos/domaineBru.webp',
  },
  {
    location: 'LANGUEDOC',
    id: 'Château de Fontenille',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauDeFontenille.webp',
  },
  {
    location: 'LANGUEDOC',
    id: 'Anne de Joyeuse',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/AnneDeJoyeuse.webp',
  },
  {
    location: 'LOIRE',
    id: 'Levron & Vincenot',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/LevronVincenot.webp',
  },
  {
    location: 'LOIRE',
    id: 'Domaine Filliatreau',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineFilliatreau.webp',
  },
  {
    location: 'LOIRE',
    id: 'Domaine Laporte',
    products: ['AOC Sancerre & Pouilly'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/DomaineLaporte.webp',
  },
  {
    location: 'LOIRE',
    id: 'Domaine Pierre Luneau-Papin',
    color: ['Vin', 'Blanc'],
    logo: './img/logos/label-pierre-luneau-papin.webp',
  },
  {
    location: 'LOIRE',
    id: 'Lorieux Alain & Pascal',
    products: ['AOC St Nicolas de Bourgueil & Chinon'],
    color: ['Vin', 'Rosé', 'Rouge'],
    logo: './img/logos/logolorieux_1.webp',
  },
  {
    location: 'LOIRE',
    id: 'Domaine Maison Père & Fils',
    products: ['AOC Cheverny'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineMaison.webp',
  },
  {
    location: 'LOIRE',
    id: 'Saget La Perrière',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/sagetLaPerriere.webp',
  },
  {
    location: 'LOIRE',
    id: 'Domaines Tatin',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domainesTatin.webp',
  },
  {
    location: 'PROVENCE',
    id: 'Château Pas du Cerf',
    products: ['AOC Cotes de Provence'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauPasDuCerf.webp',
  },
  {
    location: 'PROVENCE',
    id: 'Domaine de la Bégude',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineDeLaBegude.webp',
  },
  {
    location: 'PROVENCE',
    id: 'Domaine la Rouillère',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineRouilliere.webp',
  },
  {
    location: 'RHONE',
    id: 'Yann Chave',
    products: ['Crozes Hermitage & Hermitage'],
    color: ['Vin', 'Rouge', 'Blanc'],
    logo: './img/logos/yannChaveLogo.webp',
  },
  {
    location: 'RHONE',
    id: 'Ames Complices',
    color: ['Rouge'],
    logo: './img/logos/AmesComplices.webp',
  },
  {
    location: 'RHONE',
    id: 'Domaine de Beaurenard',
    color: ['Vin', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineDeBeaurenard.webp',
  },
  {
    location: 'RHONE',
    id: 'Domaine de la Mordorée',
    products: ['Vins du Rhone – AOC Tavel'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineMordoree.webp',
  },
  {
    location: 'RHONE',
    id: 'Domaine de Montvac',
    products: ['AOC Vacqueyras & Gigondas'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaineDeMontvac.webp',
  },
  {
    location: 'RHONE',
    id: 'Domaine Saint Amant',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domaine-saint-amant-logo.webp',
  },
  {
    location: 'RHONE',
    id: 'Château de Nages',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateaudeNages.webp',
  },
  {
    location: 'RHONE',
    id: 'Domaine Lionel Faury',
    products: ['Vins du Rhone – St Joseph'],
    color: ['Vin', 'Rouge', 'Blanc'],
    logo: './img/logos/LionelFaury.webp',
  },
  {
    location: 'SPIRITUEUX',
    id: 'Dirum Dzama',
    color: ['Spiritueux'],
    logo: './img/logos/dirumDzama.webp',
  },
  {
    location: 'SPIRITUEUX',
    id: 'Les Whiskies du Monde',
    color: ['Spiritueux'],
    logo: './img/logos/whiskiesDuMonde.webp',
  },
  {
    location: 'SPIRITUEUX',
    id: 'Pardela Spirits',
    color: ['Spiritueux'],
    logo: './img/logos/pardelaSpirits.webp',
  },
  {
    location: 'SPIRITUEUX',
    id: 'Moon Harbour',
    color: ['Spiritueux'],
    logo: './img/logos/moonHarbor.webp',
  },
  {
    location: 'SPIRITUEUX',
    id: 'Raymond Ragnaud',
    color: ['Spiritueux'],
    logo: './img/logos/raymondRagnaud.webp',
  },
  {
    location: 'SUD-OUEST',
    id: 'Bisto de Nas',
    products: ['Vins du Sud Ouest'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/bistosDeNas.webp',
  },
  {
    location: 'SUD-OUEST',
    id: 'Domaines Brumont',
    products: ['Vins du Sud Ouest'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/domainesBrumont.webp',
  },
  {
    location: 'SUD-OUEST',
    id: 'Domaine Tariquet',
    products: ['Vins de Cotes de Gascogne'],
    color: ['Vin', 'Rosé', 'Blanc', 'Spiritueux'],
    logo: './img/logos/domaineTariquet.webp',
  },
]

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoplay: {
    delay: 2500,
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
