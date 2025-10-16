# 🗄️ Configuración de Base de Datos Neon

## Pasos para configurar tu base de datos:

### 1. Crear cuenta en Neon
1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

### 2. Obtener la URL de conexión
1. En tu dashboard de Neon, copia la URL de conexión
2. Debería verse así: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con:

```env
DATABASE_URL="tu_url_de_neon_aqui"
NEXTAUTH_SECRET="tu-secret-key-aqui"
NEXTAUTH_URL="http://localhost:3003"
```

### 4. Sincronizar la base de datos
```bash
# Sincronizar el schema con la base de datos
npm run db:push

# Poblar la base de datos con datos iniciales
npm run db:seed
```

### 5. Verificar la configuración
```bash
# Abrir Prisma Studio para ver los datos
npm run db:studio
```

## Comandos útiles:

- `npm run db:push` - Sincronizar schema con la base de datos
- `npm run db:seed` - Poblar con datos iniciales
- `npm run db:studio` - Abrir interfaz visual de la base de datos
- `npx prisma generate` - Regenerar cliente de Prisma

## Estructura de la base de datos:

### Product
- id: String (UUID)
- name: String
- price: Float
- salePrice: Float? (opcional)
- imageUrl: String
- category: String
- onSale: Boolean
- stock: Int
- description: String?
- createdAt: DateTime
- updatedAt: DateTime

### Order
- id: String (UUID)
- customerName: String
- customerEmail: String
- customerPhone: String
- total: Float
- status: OrderStatus
- createdAt: DateTime
- updatedAt: DateTime

### OrderItem
- id: String (UUID)
- quantity: Int
- price: Float
- productId: String
- orderId: String

### OrderStatus (Enum)
- PENDING
- PROCESSING
- SHIPPED
- DELIVERED
- CANCELLED
