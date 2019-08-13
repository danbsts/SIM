import { NgModule}       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {AlocacaoRoutingModule} from './alocacao-routing.module'
import {AlocacaoComponent} from './alocacao.component'
import {CronogramaComponent} from './cronograma/cronograma.component'
import {DisponibilidadeComponent} from './disponibilidade/disponibilidade.component'
import {FormularioComponent} from './formulario/formulario.component'
import {AlteracaoComponent} from './alteracao/alteracao.component'
import { MonitorService } from './monitor.service';
import { FormsModule } from "@angular/forms";
import { AulaService } from './aula.service';


@NgModule({
    imports: [
        CommonModule,
        AlocacaoRoutingModule,
        FormsModule
    ],
    declarations: [
       AlocacaoComponent,
       CronogramaComponent,
       DisponibilidadeComponent,
       FormularioComponent,
       AlteracaoComponent
    ],
    providers: [MonitorService, AulaService],
})
export class AlocacaoModule {}