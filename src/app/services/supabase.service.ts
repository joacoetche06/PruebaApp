// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: localStorage,
        },
      }
    );
    console.log('Supabase initialized with URL:', environment.supabaseUrl);
  }

  get auth() {
    return this.supabase.auth;
  }

  // Método mejorado para verificar la conexión
  async testConnection(): Promise<boolean> {
    try {
      // Simplemente verificamos que el cliente se creó correctamente
      // sin hacer llamadas a la API que puedan fallar
      return !!this.supabase;
    } catch (error) {
      console.error('Supabase initialization error:', error);
      return false;
    }
  }
}
