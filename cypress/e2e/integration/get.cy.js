

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['X-Men'],
            active: true
        },

        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-Men'],
            active: true
        },

        {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['Novos Vingadores'],
            active: true
        }


    ]

    before(function () {
        cy.setToken()
        cy.back2ThePast()
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', function () {

        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })

    })

})