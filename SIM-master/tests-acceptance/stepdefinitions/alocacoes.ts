import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameName = ((elem, name) => elem.element(by.name('nome')).getText().then(text => text === name));
let sameDay = ((elem, dia) => elem.element(by.name(dia)).getText().then(text => text === "true"));
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))
let sameSome = ((elem, param, tagName) => elem.element(by.name(tagName)).getText().then(text => text === param));

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Estou na página "([^\"]*)"$/, async (page) => {
        await browser.get("http://localhost:4200");
        await expect(browser.getTitle()).to.eventually.equal(<string> page)
    })
    Given(/^Estou no menu "([^\"]*)"$/, async (menu) => {
        await browser.get("http://localhost:4200/alocacao");
        await element(by.buttonText(<string> menu)).click();
    })

    Given(/^O monitor "([^\"]*)" está cadastrado e disponível para "([^\"]*)"$/, async (name,day) => {
        await $("a[name='alocacao']").click();
        await $("button[name='disponibilidade']").click();

        var monitores : ElementArrayFinder = element.all(by.name('monitoresList'));
        await monitores;
        var monitor = monitores.filter(elem => pAND(sameName(elem, name), sameDay(elem,day)));
        await monitor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
    Given(/^A quantidade mínima de monitores da aula "([^\"]*)" é "([^\"]*)"$/, async (day, number) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.name('cronogramaTabela'));
        await aulas;
        var aula = aulas.filter(elem => sameSome(elem, day, 'data'));
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var findmin = aula.all(by.name('monitoresNecessarios'));
        await findmin;
        var min = findmin.filter(element => (element.getText()).then(e => e === number));
        await min.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));

    })
    
    Given(/^A aula "([^\"]*)" ainda não possui monitores$/, async (day) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.name('cronogramaTabela'));
        await aulas;
        var aula = aulas.filter(elem => sameSome(elem, day, 'data'));
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var findmonitor = aula.all(by.name('monitoresAlocados'));
        await findmonitor;
        var alocado = findmonitor.filter(element => (element.getText()).then(e => e === 'Qualquer monitor'));
        await alocado.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    When(/^Eu solicito a alocação do monitor "([^\"]*)" na aula "([^\"]*)"$/, async (name,day) => {
        await $("a[name='alocacao']").click();
        await $("button[name='alteracao']").click();
        await $("input[name='buscadia']").sendKeys(<string>day);
        await $("button[name='buscar']").click();
        await $("input[name='monitoresAlocados']").sendKeys(<string>name);
        await element(by.buttonText('Alocar Monitores')).click();
    })
    When(/^Eu solicito a alocação dos monitores "([^\"]*)", "([^\"]*)" e "([^\"]*)" na aula "([^\"]*)"$/, async (name1,name2,name3,day) => {
        await $("a[name='alocacao']").click();
        await $("button[name='alteracao']").click();
        await $("input[name='buscadia']").sendKeys(<string>day);
        await $("button[name='buscar']").click();
        await $("input[name='monitoresAlocados']").sendKeys(<string>name1+' '+<string>name2+' '+<string>name3);
        await element(by.buttonText('Alocar Monitores')).click();
    })
    When(/^Eu edito os monitores de "([^\"]*)", adicionando o monitor "([^\"]*)"$/, async (day,name) => {
        await element(by.buttonText('Alteracao')).click();
        await $("input[name='buscadia']").sendKeys(<string> day);
        await element(by.buttonText('Buscar Aula')).click();
        await $("input[name='monitoresAlocados']").clear();
        await $("input[name='monitoresAlocados']").sendKeys(<string>name);
        await element(by.buttonText('Confirmar')).click();
    })
    When(/^Eu tento alterar o número de monitores da aula "([^\"]*)" para "([^\"]*)"$/, async (day,number) => {
        await element(by.buttonText('Alteracao')).click();
        await $("input[name='buscadia']").sendKeys(<string> day);
        await element(by.buttonText('Buscar Aula')).click();
        await $("input[name='monitoresNecessarios']").clear(); 
        await $("input[name='monitoresNecessarios']").sendKeys(<string> number);
        await element(by.buttonText('Confirmar')).click();
    })
    Then(/^O número mínimo de monitores da aula "([^\"]*)" é alterado para "([^\"]*)"$/, async (day, number) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.name('cronogramaTabela'));
        await aulas;
        var aula = aulas.filter(elem => sameSome(elem, day, 'data'));
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var findmin = aula.all(by.name('monitoresNecessarios'));
        await findmin;
        var min = findmin.filter(element => (element.getText()).then(e => e === number));
        await min.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
    Then(/^O monitor "([^\"]*)" aparece alocado na aula "([^\"]*)"$/, async (name, day) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.name('cronogramaTabela'));
        await aulas;
        var aula = aulas.filter(elem => sameSome(elem, day, 'data'));
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var findmonitor = aula.all(by.name('monitoresAlocados'));
        await findmonitor;
        var alocado = findmonitor.filter(element => (element.getText()).then(e => e === name));
        await alocado.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
    Then(/^Aparece uma mensagem de erro$/, async () => {
        await expect($("h5[name = 'mensagem']").getText().then(e=> e == 'Quantidade insuficiente de monitores'));
    })
})