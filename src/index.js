const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');

const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMiniBio = $('#minibio');
const $inputEndereco = $('#endereco');
const $inputComplemento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCep = $('#cep');

let nomeValido = false;
let sobrenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;
let enderecoValido = false;
let cidadeValida = false;
let cepValido = false;

const minLengthText = 2;

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

function validarInput(element, minLength, maxLength, regex) {
const closest = $(element).closest('.input-data');
        if(!element.value 
            || (minLength && element.value.trim().length < minLength)
            || (maxLength && element.value.trim().length > maxLength)
            || (regex && !element.value.toLowerCase().match(regex))
        ) {
            closest.addClass('error');
            return false;
        }
         closest.removeClass('error');
         return true;
    }

    function validarFormularioUm(){
        if(nomeValido && sobrenomeValido && emailValido && dataNascimentoValido){
            $containerBtnFormOne.removeClass('disabled');
            $btnFormOne.removeClass('disabled');
            $btnFormOne.off('click').on('click', iniciarFormulario2);
        }else{
            $containerBtnFormOne.addClass('disabled');
            $btnFormOne.addClass('disabled');
            $btnFormOne.off('click');
        }
    }

    function iniciarFormulario2(){
        $stepText.text('Passo 2 de 3 - Dados de correspondência');
        $stepDescription.text('Precisamos desses dados para que possamos entrar em contato se necessário');
        $stepOne.hide();
        $stepTwo.show();

        $inputEndereco.keyup(function(){
            enderecoValido = validarInput(this, minLengthText);
        });

        $inputCidade.keyup(function(){
            cidadeValida = validarInput(this, minLengthText);
        });
    }

function init(){
    $stepText.text('Passo 1 de 3 - Dados pessoais')
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor')
    $stepTwo.hide();
    $stepThree.hide();

    $inputNome.keyup(function () {
        nomeValido = validarInput(this, minLengthText);
        validarFormularioUm();
    });
    
    $inputSobrenome.keyup(function () {
        sobrenomeValido = validarInput(this, minLengthText);
        validarFormularioUm();
    });

    $inputDataNascimento.keyup(function () {
        dataNascimentoValido = validarInput(this, minLengthText);
        validarFormularioUm();
    });

    $inputDataNascimento.change(function () {
        dataNascimentoValido = validarInput(this, minLengthText);
        validarFormularioUm();
    });

    $inputEmail.keyup(function () {
        emailValido = validarInput(this, null, null, emailRegex);
        validarFormularioUm();
    });

    $inputMiniBio.keyup(function () {
        validarFormularioUm();
    });

    $inputDataNascimento.on('focus', function(){
        this.type = 'date';
    });

    $inputDataNascimento.on('blur', function(){
        if(!this.value){
            this.type = 'text';
        }
    });
}

init();