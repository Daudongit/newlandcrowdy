'use strict'

class HomeController {
    async getIndex ({view}) {
        return view.render('index',{
            // sliders : await Slider.query().get()
        })
    }
}

module.exports = HomeController
