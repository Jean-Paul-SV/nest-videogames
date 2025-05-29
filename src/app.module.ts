import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VideoGamesModule } from './videojuegos/videogames.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from 'config/env.config';
import { JoiValidationSchema } from 'config/joi.validation';
/**
 * Módulo principal de la aplicación
 * Configura y conecta todos los módulos de la aplicación
 * 
 * @property imports - Módulos que componen la aplicación:
 * - ServeStaticModule: Para servir archivos estáticos
 * - MongooseModule: Conexión a MongoDB
 * - VideoGamesModule: Gestión de videojuegos
 * - CommonModule: Funcionalidades comunes
 * - SeedModule: Datos iniciales
 * - AdminModule: Funciones administrativas
 * - AuthModule: Autenticación y autorización
 */
@Module({
  imports: [
    ConfigModule.forRoot({  // Configuración de la aplicación
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    // Configuración para servir archivos estáticos desde la carpeta public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Conexión a la base de datos MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB'),
        dbName: 'videogamesdb',
      }),
    }),
    // Módulos de la aplicación
    VideoGamesModule,
    CommonModule,
    SeedModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
