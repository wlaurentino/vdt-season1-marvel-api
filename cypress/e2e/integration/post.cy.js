

describe('POST /characters', function () {

    before(function () {
        cy.setToken()
        cy.back2ThePast()
    })

    it('deve cadastrar um personagem', function () {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })

    })

    context('quando o personagem já existe', function () {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercúrio',
            team: ['Vingadores da Costa Oeste',
                'Irmandade de Mutantes'
            ],
            active: true
        }


        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })

        })

        it('não deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })

        })

    })

})
