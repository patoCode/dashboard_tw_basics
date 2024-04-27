console.log(":::: load app.js ::::")
// SIDEBAR
document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function(item){
    item.addEventListener('click',function(e){
        const parent = item.closest('.group')
        if(parent.classList.contains('selected')){
            parent.classList.remove('selected')
        }else{
            document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function(item){
                item.closest('.group').classList.remove('.selected')
            })
            parent.classList.add('selected')
        }
    })
})
// END SIDEBAR

// SEARCH FORM
const popperInstance = {}
document.querySelectorAll('.search-dropdown').forEach(function(item, index){
    const popperId = 'popper-'+index
    const toggle = item.querySelector('.search-dropdown-toggle')
    const menu = item.querySelector('.search-dropdown-menu')
    menu.dataset.popperId = popperId
    popperInstance[popperId] = Popper.createPopper(toggle, menu, {
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        },{
            name:'preventOverflow',
            options:{
                padding:24,
            }
        }
        ],
        placement:'bottom-end'
    })
    document.addEventListener('click', function(e){
        console.log("::: EVENTO LANZADO :::")
        const toggle = e.target.closest('.search-dropdown-toggle')
        const menu = item.querySelector('.search-dropdown-menu')
        if(toggle){
            const menuEl = toggle.closest('.search-dropdown').querySelector('.search-dropdown-menu')
            const popperId = menuEl.dataset.popperId
            if(menuEl.classList.contains('hidden')){
                hideDropdown()
                menuEl.classList.remove('hidden')
            }else{
                menuEl.classList.add('hidden')
                hiddenPopper(popperId)
            }
        } else if(!menu){
            hideDropdown()
        }
    })

    function hideDropdown(){
        document.querySelectorAll('.search-dropdown-menu').forEach(function(item){
            item.classList.add('hidden')
        })
    }

    function showPopper(popperId) {
        popperInstance[popperId].setOptions(function (options){
                return {
                    ...options,
                    modifiers: [
                        ...options.modifiers,
                        {
                            name: 'eventListeners',
                            enabled: true
                        },
                    ],
                }
            }
        );
        popperInstance[popperId].update()
    }
    function hiddenPopper(popperId) {
        popperInstance[popperId].setOptions(function (options){
                return {
                    ...options,
                    modifiers: [
                        ...options.modifiers,
                        {
                            name: 'eventListeners',
                            enabled: false
                        },
                    ],
                }
            }
        );
    }

})
// END SEARCH FORM
