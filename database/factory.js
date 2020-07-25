'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, index, data) => {
    const defaultValue = {
        phone_number: faker.phone(),
        last_name: faker.last(),
        first_name: faker.first(),
        username: faker.unique(faker.word,50)[0],
        email: faker.unique(faker.email,50)[0],
        password: 'secret',
        verified: faker.pickone(['1',faker.string({ length: 30 })]),
        wallet: faker.integer({min:5000,max:500000}),
        role: false,
        suspended: false,
        address: faker.address(),
        city: faker.city(),
        state: faker.state({ full: true }),
        picture: 'test.jpg',
        id_card: 'test.jpg'
    }
    
    return Object.assign(defaultValue, data)
  })

Factory.blueprint('App/Models/Reference', (faker, index, data) => {
    const defaultValue = {
        title: faker.unique(faker.word,20)[0],
        slug: faker.unique(faker.word,20)[0],
        // slug: faker.pickone(['min_investment', 'max_investment']),
        value: faker.integer({min:2344,max:37528}),
        type: faker.unique(faker.word,20)[0],
        last_updated_by: async () => {
            return (await Factory.model('App/Models/User').create()).id
        }
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Transaction', (faker, index, data) => {
    const messages = [
        'Bought Package Through Bank Deposit',
        'Bought Package Through Online Payment',
        'Withdrawal Request Submitted Successfully'
    ]
    const from = ['bank_deposit','online_deposit','withdrawal']
    const key = faker.integer({min:0,max:2})

    const defaultValue = {
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        message: messages[key],
        from: from[key],
        from_id: faker.integer({min:1,max:10}),
        amount: faker.integer({min:4003,max:328731}),
        type: faker.bool(),
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Withdrawal', (faker, index, data) => {
    const defaultValue = {
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        amount: faker.integer({min:1000,max:269564}),
        charge: faker.integer({min:1000,max:10000}),
        // status: true,
        status: faker.bool({likelihood: 30}),
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Project', (faker, index, data) => {
    const defaultValue = {
        name: faker.unique(faker.word,50)[0],
        duration: faker.integer({min:5,max:20}),
        // interest: faker.unique(faker.word,20)[0],
        capital: faker.integer({min:100000,max:2000000}),
        active: true,
        flats: faker.unique(faker.word,20)[0],
        slots: faker.integer({min:4,max:10}),
        annum_return: faker.integer({ min: 50000, max: 300000 }),
        sold_status:faker.pickone([0, 1,2]),
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Package', (faker, index, data) => {
    const defaultValue = {
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        project_id: async () => {
            return (await Factory.model('App/Models/Project').create()).id
        },
        // status: faker.bool({likelihood: 30}),
        status: true,
        started: faker.date({year: 2019}),
        last_process: faker.date({year: 2020}),
        amount: faker.integer({ min: 50000, max: 3000000 })
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/BankDetail', (faker, index, data) => {
    const defaultValue = {
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        bank_name: faker.unique(faker.word,20)[0],
        account_name: faker.unique(faker.word,20)[0],
        account_number: faker.integer({ min: 1111111111, max: 9999999999 })
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Bank', (faker, index, data) => {
    const defaultValue = {
        name: faker.unique(faker.word,20)[0],
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Deposit', (faker, index, data) => {
    const defaultValue = {
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        package_id: async () => {
            return (await Factory.model('App/Models/Package').create()).id
        },
        platform: faker.unique(faker.word,20)[0],
        status: true,
        approved: faker.date({year: 2020}),
        amount: faker.integer({ min: 36548, max: 237672098 }),
        reference: faker.unique(faker.word,20)[0],
        reason: faker.unique(faker.word,20)[0],
        file: faker.unique(faker.word,20)[0],
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Payment', (faker, index, data) => {
    const defaultValue = {
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        package_id: async () => {
            return (await Factory.model('App/Models/Package').create()).id
        },
        status: true,
        amount: faker.integer({min:10000,max:1000000})
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Announcement', (faker, index, data) => {
    const defaultValue = {
        title: faker.unique(faker.word,20)[0],
        message: faker.sentence(),
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/UserAnnouncement', (faker, index, data) => {
    const defaultValue = {
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        announcement_id:  async () => {
            return (await Factory.model('App/Models/Announcement').create()).id
        },
        opened: faker.bool(),
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Support', (faker, index, data) => {
    const defaultValue = {
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        reply_by: faker.integer({min:1,max:5}),
        message: faker.sentence(),
        reply: faker.sentence(),
        type: faker.unique(faker.word,20)[0],
        status: true,
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/SupportType', (faker, index, data) => {
    const defaultValue = {
        name: faker.unique(faker.word,20)[0],
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Faq', (faker, index, data) => {
    const defaultValue = {
        question: faker.sentence({ words: 5 }),
        answer: faker.sentence()
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/BankOption', (faker, index, data) => {
    const defaultValue = {
        bank_name: faker.unique(faker.word,20)[0],
        account_name: faker.unique(faker.word,20)[0],
        account_number: faker.integer({ min: 1111111111, max: 9999999999 })
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Testimonial', (faker, index, data) => {
    const defaultValue = {
        name: faker.unique(faker.word,20)[0],
        role: faker.unique(faker.word,20)[0],
        message: faker.sentence(),
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        display: faker.bool()
    }
    
    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Referral', (faker, index, data) => {
    const defaultValue = {
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        referred_by: async () => {
            return (await Factory.model('App/Models/User').create()).id
        },
        amount: faker.integer({min:20945,max:3985626}),
        status: true,
    }
    
    return Object.assign(defaultValue, data)
})

  
