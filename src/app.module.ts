// NestJs
import { Module } from "@nestjs/common";
import { MikroOrmModule } from '@mikro-orm/nestjs'

// local
import { mikroOrmOptions } from "./shared/infrastructure/database/mikro-orm-options";

@Module({
    imports: [MikroOrmModule.forRoot(mikroOrmOptions)],
    controllers: [],
    providers: []
})

export class AppModule {}

