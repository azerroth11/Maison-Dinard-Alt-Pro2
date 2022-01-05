const navigation = document.querySelector('.navigation')
const navigationItems = Array.from(navigation.children)

navigationItems.forEach((a) => {
  a.addEventListener('click', () => {
    const rollableMenu = document.querySelector('.rollableMenu')
    const results = document.querySelector('.results')
    if (a.innerText == 'Vins' && rollableMenu.innerHTML == '') {
      const menuDiv = rollableMenu.appendChild(document.createElement('div'))
      const menuDivLink = menuDiv.appendChild(document.createElement('a'))
      menuDivLink.href = 'javascript:;'
      menuDivLink.innerText = 'Régions'
      if (rollableMenu.lastChild.innerText == 'Régions') {
        const menuDivRegions = rollableMenu.appendChild(document.createElement('div'))
        data.forEach((domain) => {
          if (domain.color.includes('Vin')) {
            if (
              menuDivRegions.innerHTML == '' ||
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
                  document.querySelector('.domains').innerHTML = ''
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
                      rollableMenu.innerHTML = ''
                      const hero = document.querySelector('.hero')
                      if (hero.lastElementChild.classList.contains('swiper-pagination')) {
                        const domainDetails = hero.appendChild(document.createElement('div'))
                        domainDetails.classList.add('domainDetails')
                      }
                    })
                  }
                })
              })
            }
          }
        })
      }
    } else if (a.innerText == 'Vins' && !rollableMenu.innerHTML == '') {
      rollableMenu.innerHTML = ''
    } else {
      rollableMenu.innerHTML = ''
    }
  })
})

// Data
const data = [
  {
    location: 'BEAUJOLAIS',
    id: 'Domaine Dubost',
    products: ['Vins de Bourgogne'],
    color: ['Vin', 'Rouge'],
    logo: './img/logos/domaineDubost.webp',
  },
  {
    location: 'BEAUJOLAIS',
    id: 'Château de Pizay',
    products: ['Morgon, Beaujolais, Bourgogne'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/chateauPizay.webp',
  },
  {
    location: 'BORDEAUX',
    id: 'H. Cuvelier & Fils',
    products: ['Vins de Bordeaux'],
    color: ['Vin', 'Rouge'],
    logo: './img/logos/cuvelierFils.webp',
  },
  {
    location: 'BORDEAUX',
    id: 'Domaines Select',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: '',
  },
  { location: 'BORDEAUX', id: 'Gironde et Gascogne', color: ['Rouge'], logo: '' },
  {
    location: 'BORDEAUX',
    id: 'Château Tourteau Chollet',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: '',
  },
  {
    location: 'BORDEAUX',
    id: 'Famille André Lurton',
    products: ['AOC Pessac Leognan'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
    logo: './img/logos/andré-lurton-logo.webp',
  },
  {
    location: 'BOURGOGNE',
    id: 'Domaines Devillard',
    products: ['AOC Mercurey'],
    color: ['Vin', 'Rouge', 'Blanc'],
    logo: '',
  },
  {
    location: 'BOURGOGNE',
    id: 'Domaine Nathalie & Gilles Fèvre',
    products: ['AOC Chablis'],
    color: ['Vin', 'Blanc'],
    logo: '',
  },
  {
    location: 'BOURGOGNE',
    id: 'Maison René Lamy',
    products: ['Vins de Bourgogne'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'CHAMPAGNE',
    id: 'Billecart-Salmon',
    products: ['Champagne'],
    color: ['Champagne'],
  },
  {
    location: 'CHAMPAGNE',
    id: 'Champagne Drappier',
    products: ['Champagne'],
    color: ['Champagne'],
  },
  {
    location: 'CORSE',
    id: 'Domaine Vico',
    products: ['Vins de Corse'],
    color: ['Vin', 'Rouge', 'Blanc'],
  },
  {
    location: 'LANGUEDOC',
    id: 'Domaine de la Cendrillon',
    products: ['AOC Corbières'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'LANGUEDOC',
    id: 'Domaine Grand Chemin',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'LANGUEDOC',
    id: 'Domaine la Croix Chaptal',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  { location: 'LANGUEDOC', id: 'Domaines Bru', color: ['Vin', 'Rouge'] },
  {
    location: 'LANGUEDOC',
    id: 'Château de Fontenille',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'LANGUEDOC',
    id: 'Anne de Joyeuse',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'LOIRE',
    id: 'Levron & Vincenot',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'LOIRE',
    id: 'Domaine Filliatreau',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'LOIRE',
    id: 'Domaine Laporte',
    products: ['AOC Sancerre & Pouilly'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  { location: 'LOIRE', id: 'Domaine Pierre Luneau-Papin', color: ['Vin', 'Blanc'] },
  {
    location: 'LOIRE',
    id: 'Lorieux Alain & Pascal',
    products: ['AOC St Nicolas de Bourgueil & Chinon'],
    color: ['Vin', 'Rosé', 'Rouge'],
  },
  {
    location: 'LOIRE',
    id: 'Domaine Maison Père & Fils',
    products: ['AOC Cheverny'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'LOIRE',
    id: 'Saget La Perrière',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'LOIRE',
    id: 'Domaines Tatin',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'PROVENCE',
    id: 'Château Pas du Cerf',
    products: ['AOC Cotes de Provence'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'PROVENCE',
    id: 'Domaine de la Bégude',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'PROVENCE',
    id: 'Domaine la Rouillère',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'RHONE',
    id: 'Yann Chave',
    products: ['Crozes Hermitage & Hermitage'],
    color: ['Vin', 'Rouge', 'Blanc'],
  },
  { location: 'RHONE', id: 'Ames Complices', color: ['Rouge'] },
  {
    location: 'RHONE',
    id: 'Domaine de Beaurenard',
    color: ['Vin', 'Rouge', 'Blanc'],
  },
  {
    location: 'RHONE',
    id: 'Domaine de la Mordorée',
    products: ['Vins du Rhone – AOC Tavel'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'RHONE',
    id: 'Domaine de Montvac',
    products: ['AOC Vacqueyras & Gigondas'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'RHONE',
    id: 'Domaine Saint Amant',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'RHONE',
    id: 'Château de Nages',
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'RHONE',
    id: 'Domaine Lionel Faury',
    products: ['Vins du Rhone – St Joseph'],
    color: ['Vin', 'Rouge', 'Blanc'],
  },
  { location: 'SPIRITUEUX', id: 'Dirum Dzama', color: ['Spiritueux'] },
  {
    location: 'SPIRITUEUX',
    id: 'Les Whiskies du Monde',
    color: ['Spiritueux'],
  },
  { location: 'SPIRITUEUX', id: 'Pardela Spirits', color: ['Spiritueux'] },
  { location: 'SPIRITUEUX', id: 'Moon Harbour', color: ['Spiritueux'] },
  { location: 'SPIRITUEUX', id: 'Raymond Ragnaud', color: ['Spiritueux'] },
  {
    location: 'SUD-OUEST',
    id: 'Bisto de Nas',
    products: ['Vins du Sud Ouest'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'SUD-OUEST',
    id: 'Domaines Brumont',
    products: ['Vins du Sud Ouest'],
    color: ['Vin', 'Rosé', 'Rouge', 'Blanc'],
  },
  {
    location: 'SUD-OUEST',
    id: 'Domaine Tariquet',
    products: ['Vins de Cotes de Gascogne'],
    color: ['Vin', 'Rosé', 'Blanc', 'Spiritueux'],
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
