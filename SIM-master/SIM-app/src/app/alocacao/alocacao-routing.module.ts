import {NgModule} from '@angular/core'
import {AlocacaoComponent} from './alocacao.component'
import {AlteracaoComponent} from './alteracao/alteracao.component'
import {CronogramaComponent} from './cronograma/cronograma.component'
import {DisponibilidadeComponent} from './disponibilidade/disponibilidade.component'
import {FormularioComponent} from './formulario/formulario.component'
import { RouterModule, Routes } from '@angular/router';

const alocacaoroutes: Routes = [
    {
        path: '', 
        component: AlocacaoComponent,
        children: [
            {path: 'alteracao', component: AlteracaoComponent},
            {path: 'cronograma', component: CronogramaComponent},
            {path: 'disponibilidade', component: DisponibilidadeComponent},
            {path: 'formulario', component: FormularioComponent}
        ]

    }
    
]

@NgModule({
    imports: [
        RouterModule.forChild(alocacaoroutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AlocacaoRoutingModule{}