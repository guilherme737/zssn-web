(function () {
    'use strict';

    angular
            .module('app.exchange')
            .controller('ExchangeController', ExchangeController);

    function ExchangeController($scope, ExchangeService, localStorageService, $ngBootbox) {

        //Declaração de variaveis utilizadas no painel de troca
        $scope.wantedPoints = 0;
        $scope.paymentPoints = 0;

        $scope.personExchange = {};

        $scope.itemsWanted = [
            {name: 'Water', count: 0},
            {name: 'Food', count: 0},
            {name: 'Medication', count: 0},
            {name: 'Ammunition', count: 0}
        ];
        $scope.itemsPayment = [
            {name: 'Water', count: 0},
            {name: 'Food', count: 0},
            {name: 'Medication', count: 0},
            {name: 'Ammunition', count: 0}
        ];

        $scope.itemQuantidade1 = true;
        
        //Busca na API os items atuais do sobrevivente autenticado
        ExchangeService.getMyItems().then(function (items) {
            $scope.inventario = items;
            $scope.meusPontosTotais = 0;

            angular.forEach(items, function (value, key) {
                if (value.quantity == 1) {
                    $scope.itemQuantidade1 = false;
                }
                $scope.meusPontosTotais += (value.item.points * value.quantity);
            });
        });

        //Busca todos os sobreviventes para utilizar na busca por nomes
        ExchangeService.getAllPeople().then(function (survivors) {
            $scope.survivors = survivors;
        });

        $scope.addWantedPoints = function (item) {
            switch (item) {
                case 'Water':
                {
                    $scope.wantedPoints += 4;
                    break;
                }
                case 'Food':
                {
                    $scope.wantedPoints += 3;
                    break;
                }
                case 'Medication':
                {
                    $scope.wantedPoints += 2;
                    break;
                }
                case 'Ammunition':
                {
                    $scope.wantedPoints += 1;
                    break;
                }
            }
        };

        $scope.addPaymentPoints = function (item) {
            switch (item) {
                case 'Water':
                {
                    $scope.paymentPoints += 4;
                    break;
                }
                case 'Food':
                {
                    $scope.paymentPoints += 3;
                    break;
                }
                case 'Medication':
                {
                    $scope.paymentPoints += 2;
                    break;
                }
                case 'Ammunition':
                {
                    $scope.paymentPoints += 1;
                    break;
                }
            }
        };
        
        $scope.remWantedPoints = function (item) {
            switch (item) {
                case 'Water':
                {
                    $scope.wantedPoints -= 4;
                    break;
                }
                case 'Food':
                {
                    $scope.wantedPoints -= 3;
                    break;
                }
                case 'Medication':
                {
                    $scope.wantedPoints -= 2;
                    break;
                }
                case 'Ammunition':
                {
                    $scope.wantedPoints -= 1;
                    break;
                }
            }
        };

        $scope.remPaymentPoints = function (item) {
            switch (item) {
                case 'Water':
                {
                    $scope.paymentPoints -= 4;
                    break;
                }
                case 'Food':
                {
                    $scope.paymentPoints -= 3;
                    break;
                }
                case 'Medication':
                {
                    $scope.paymentPoints -= 2;
                    break;
                }
                case 'Ammunition':
                {
                    $scope.paymentPoints -= 1;
                    break;
                }
            }
        };

        //Limpa items da area de troca
        $scope.clearItems = function () {
            $scope.itemsWanted = [
                {name: 'Water', count: 0},
                {name: 'Food', count: 0},
                {name: 'Medication', count: 0},
                {name: 'Ammunition', count: 0}
            ];
            $scope.itemsPayment = [
                {name: 'Water', count: 0},
                {name: 'Food', count: 0},
                {name: 'Medication', count: 0},
                {name: 'Ammunition', count: 0}
            ];
            $scope.wantedPoints = 0;
            $scope.paymentPoints = 0;
        };

        //Função que realiza a troca de items entre sobreviventes
        $scope.makeExchange = function () {
            //Variaveis locais	
            var data = {};
            var itemsWanted = "";
            var itemsPayment = "";
            
            var meuNome = localStorageService.get('user').name;

            //Verifica se selecionou alum sobrevivente para troca
            if ($scope.personExchange.nome != null) {
                //Obetem o id desse sobrevivente	
                var personId = $scope.personExchange.nome.location.replace('http://zssn-backend-example.herokuapp.com/api/people/', '');

                //Transforma os items atualizado na forma esperada pela API
                angular.forEach($scope.itemsWanted, function (value, key) {
                    if (value.count != 0) {
                        itemsWanted += (value.name + ':' + value.count + ';');
                    }
                });
                
                angular.forEach($scope.itemsPayment, function (value, key) {
                    if (value.count != 0) {
                        itemsPayment += (value.name + ':' + value.count + ';');
                    }
                });

                //Data post montado, pronto para ser enviado pelo service
                data = {person_id: personId, consumer: {name: meuNome, pick: itemsWanted, payment: itemsPayment}};

                
                ExchangeService.makeExchange(data).then(function (data) {
                    if (data == "") {
                        
                        $ngBootbox.alert('Successfully made exchange!')
                        
                    } else {
                        $ngBootbox.alert('Failed to make the exchange.')
                    }
                });
            }
            
            else {
                
                $ngBootbox.alert('Error while selecting person. Select a person!')
                
            }
        };
    }

})();