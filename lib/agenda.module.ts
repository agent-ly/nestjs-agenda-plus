import { Global, Module, OnApplicationShutdown } from "@nestjs/common";
import { DiscoveryModule, ModuleRef } from "@nestjs/core";
import { Agenda } from "@hokify/agenda";
import { AgendaMetadataAccessor } from "./agenda.metadata-accessor";
import { AgendaExplorer } from "./agenda.explorer";
import { ConfigurableModuleClass } from "./agenda.module-definition";

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [AgendaMetadataAccessor, AgendaExplorer],
})
export class AgendaModule
  extends ConfigurableModuleClass
  implements OnApplicationShutdown
{
  constructor(private readonly modRef: ModuleRef) {
    super();
  }

  async onApplicationShutdown() {
    const agenda = this.modRef.get(Agenda);
    await agenda.stop();
  }
}
