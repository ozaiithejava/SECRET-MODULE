# SECRET-MODULE
secret module same .env but better

## .secret file
```markdown
<Variables_Name>Value<Type>
```

## Examlpe all Types
```Markdown
<Port>8888<Public>
<User>ozaii<Protected>
<DatabasePassword>secretpassword<Private>
<APIKey>supersecretkey<Own>
```

## Usage:
```Typescript
// main.ts
import { SecretManager, TagType } from './SecretManager';

// .secret dosyasının yolu
const secretFilePath = '.secret';

// SecretManager sınıfını kullanarak örnek işlemler yapalım
const secretManager = new SecretManager(secretFilePath);

// Örnek kullanım
console.log(secretManager.get('Port')); // Örnek çıktı: 8888
console.log(secretManager.get('User')); // Örnek çıktı: ozaii

// Yeni bir değer ekleyelim
secretManager.set('NewKey', 'NewValue', 'Public');
console.log(secretManager.get('NewKey')); // Örnek çıktı: NewValue

// Bir değeri silelim
secretManager.delete('Port');
console.log(secretManager.get('Port')); // Örnek çıktı: undefined

// Bir değeri güncelleyelim
secretManager.update('User', 'newUser', 'Private');
console.log(secretManager.get('User')); // Örnek çıktı: ozaii
```
