import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanchaModule } from './cancha/cancha.module';
import { HorarioModule } from './horario/horario.module';
import { DisponibilidadModule } from './disponibilidad/disponibilidad.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // lee el archivo .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_NAME', 'canchas_db'),
        autoLoadEntities: true,
        // IMPORTANTE: como ustedes ya crearon las tablas con SQL,
        // synchronize debe quedar en false para no arriesgar el esquema.
        synchronize: false,
      }),
    }),
    CanchaModule,
    HorarioModule,
    DisponibilidadModule,
  ],
})
export class AppModule {}
