import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient = createClient(
    'https://gmolxvlurzgjdcgiklxa.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtb2x4dmx1cnpnamRjZ2lrbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NzI1MzksImV4cCI6MjA4NDU0ODUzOX0.HAPiEziWCZYe63F7M5dON9XLP7Wl16Ha1KRRfI3caT0',                   
  );

  async getAll() {
    const { data } = await this.supabase.from('guestbook').select('*').order('created_at', { ascending: false });
    return data;
  }

  async create(entry: { name: string; message: string }) {
    const { data } = await this.supabase.from('guestbook').insert([entry]).select();
    return data;
  }

  async update(id: string, entry: { message: string }) {
    const { data } = await this.supabase.from('guestbook').update(entry).eq('id', id).select();
    return data;
  }

  async delete(id: string) {
    await this.supabase.from('guestbook').delete().eq('id', id);
    return { deleted: true };
  }
}