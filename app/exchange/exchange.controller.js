(function () {
    'use strict';

    angular
            .module('app.exchange')
            .controller('ExchangeController', ExchangeController);

    function ExchangeController($scope, ExchangeService, $rootScope, localStorageService, $mdDialog) {

        //Declaração de variaveis utilizadas no painel de troca
        $scope.pontosCompra = 0;
        $scope.pontosPagamento = 0;

        $scope.trocaPerson = {};

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
        ExchangeService.getAllPeople().then(function (sobreviventes) {
            $scope.todosSobreviventes = sobreviventes;
        });

        //Adicona na view os quantos pontos os items irão custar
        $scope.addPontosCompra = function (item) {
            switch (item) {
                case 'Water':
                {
                    $scope.pontosCompra += 4;
                    break;
                }
                case 'Food':
                {
                    $scope.pontosCompra += 3;
                    break;
                }
                case 'Medication':
                {
                    $scope.pontosCompra += 2;
                    break;
                }
                case 'Ammunition':
                {
                    $scope.pontosCompra += 1;
                    break;
                }
            }
        };

        //Adicona na view os quantos pontos totais no pagamento
        $scope.addPontosPagamento = function (item) {
            switch (item) {
                case 'Water':
                {
                    $scope.pontosPagamento += 4;
                    break;
                }
                case 'Food':
                {
                    $scope.pontosPagamento += 3;
                    break;
                }
                case 'Medication':
                {
                    $scope.pontosPagamento += 2;
                    break;
                }
                case 'Ammunition':
                {
                    $scope.pontosPagamento += 1;
                    break;
                }
            }
        };

        //Limpa items da area de troca
        $scope.limparItems = function () {
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
            var itemsCompra = "";
            var itemsPagamento = "";
            var meuNome = localStorageService.get('user').name;

            //Verifica se selecionou alum sobrevivente para troca
            if ($scope.trocaPerson.nome != null) {
                //Obetem o id desse sobrevivente	
                var idPerson = $scope.trocaPerson.nome.location.replace('http://zssn-backend-example.herokuapp.com/api/people/', '');

                //Transforma os items atualizado na forma esperada pela API
                angular.forEach($scope.itemsCompra, function (value, key) {
                    if (value.count != 0)
                        itemsCompra += (value.name + ':' + value.count + ';');
                });
                angular.forEach($scope.itemsPagamento, function (value, key) {
                    if (value.count != 0)
                        itemsPagamento += (value.name + ':' + value.count + ';');
                });

                //Data post montado, pronto para ser enviado pelo service
                data = {person_id: idPerson, consumer: {name: meuNome, pick: itemsCompra, payment: itemsPagamento}};

                //Chama o service responsavel por realizar a troca
                ExchangeService.RealizarTroca(data).then(function (data) {
                    if (data == "") {
                        //Troca realizada com sucesso!
                        $mdDialog.show(
                                $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('Troca realizada com sucesso!')
                                .textContent('Parabens! A troca de items foi um sucesso!')
                                .ok('Ok')
                                .openFrom('#left')
                                .closeTo(angular.element(document.querySelector('#right')))
                                );
                    } else {
                        //Falha na troca
                        $mdDialog.show(
                                $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('Failed to perform item exchange')
                                .textContent('It was not possible to exchange items!')
                                .ok('Ok')
                                .openFrom('#left')
                                .closeTo(angular.element(document.querySelector('#right')))
                                );
                    }
                });
            }
            //Caso o usuário não tenha selecionado um sobrevivente para realizar a troca, emite esse erro
            else {
                $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Error while selecting person')
                        .textContent('Select a person!')
                        .ok('Ok')
                        .openFrom('#left')
                        .closeTo(angular.element(document.querySelector('#right')))
                        );
            }
        };
    }

})();