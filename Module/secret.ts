// SecretManager.ts
import * as fs from 'fs';

export type TagType = 'Private' | 'Protected' | 'Own' | 'Public';

interface SecretData {
  value: string;
  type: TagType;
}

export class SecretManager {
  private filePath: string;

  // Constructor, .secret dosyasının yoluyla başlatılır.
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  // .secret dosyasını okur ve verileri içeren bir nesne döndürür.
  private readSecretFile(): Record<string, SecretData> {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      const lines = data.split('\n');

      const secrets: Record<string, SecretData> = {};

      lines.forEach((line) => {
        const matches = line.match(/<(\w+)>(\w+)<(\w+)>/);

        if (matches) {
          const [, key, value, type] = matches;
          secrets[key] = { value, type: type as TagType };
        }
      });

      return secrets;
    } catch (error) {
      return {};
    }
  }

  // Verilen anahtar (key) için değeri döndürür.
  // Eğer tip 'Private' ise, değeri asla döndürmez.
  get(key: string): string | undefined {
    const secrets = this.readSecretFile();
    const secret = secrets[key];

    return secret?.type === 'Private' ? undefined : secret?.value;
  }

  // Verilen anahtar (key) için değer ve tipi ile birlikte .secret dosyasına ekler.
  set(key: string, value: string, type: TagType): void {
    const secrets = this.readSecretFile();
    secrets[key] = { value, type };
    this.writeSecretFile(secrets);
  }

  // Verilen anahtar (key) için değeri ve tipini .secret dosyasından siler.
  delete(key: string): void {
    const secrets = this.readSecretFile();
    delete secrets[key];
    this.writeSecretFile(secrets);
  }

  // Verilen anahtar (key) için değeri ve tipini günceller.
  update(key: string, value: string, type: TagType): void {
    const secrets = this.readSecretFile();
    if (secrets[key]) {
      secrets[key] = { value, type };
      this.writeSecretFile(secrets);
    }
  }

  // Verilen verileri .secret dosyasına yazar.
  private writeSecretFile(secrets: Record<string, SecretData>): void {
    const lines = Object.entries(secrets)
      .map(([key, { value, type }]) => `<${key}>${value}<${type}>`)
      .join('\n');

    fs.writeFileSync(this.filePath, lines, 'utf8');
  }
}
