import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductList } from "@/components/ProductList";
import { ArrowRight, Star, Truck, Shield, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 py-20 px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          {/* Badge de oferta */}
          <div className="inline-flex items-center bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full px-6 py-3 mb-8 shadow-lg">
            <span className="font-bold text-sm">🔥 ¡Hasta 50% OFF en productos seleccionados!</span>
          </div>
          
          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Bienvenido a{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              MinCommerce
            </span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Descubre productos únicos con la mejor calidad y precios competitivos. 
            <span className="font-semibold text-yellow-200"> Tu tienda online de confianza.</span>
          </p>
          
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/catalog">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                🛍️ Explorar Catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/orders">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10">
                📦 Ver Pedidos
              </Button>
            </Link>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Productos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24h</div>
              <div className="text-white/80">Envío</div>
            </div>
          </div>
        </div>
        
        {/* Elementos decorativos mejorados */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-300/20 to-red-300/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir <span className="text-emerald-600">MinCommerce</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de compra online con garantías que nos respaldan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Envío Rápido</h3>
                <p className="text-gray-600 text-lg">
                  Entregas en 24-48 horas en toda la ciudad con seguimiento en tiempo real
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Compra Segura</h3>
                <p className="text-gray-600 text-lg">
                  Transacciones protegidas con encriptación SSL y garantía de devolución
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Calidad Premium</h3>
                <p className="text-gray-600 text-lg">
                  Productos seleccionados con los más altos estándares de calidad
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🏆 Productos <span className="text-emerald-600">Destacados</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Los productos más populares de nuestra tienda
            </p>
            <Link href="/catalog">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <ProductList />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ⭐ Lo que dicen nuestros <span className="text-emerald-600">clientes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Miles de clientes satisfechos respaldan nuestra calidad
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardContent>
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "Excelente servicio y productos de calidad. El envío fue súper rápido y el producto llegó perfecto."
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    MG
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">María González</p>
                    <p className="text-gray-500 text-sm">Cliente desde 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardContent>
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "La mejor experiencia de compra online que he tenido. Atención al cliente excepcional y productos increíbles."
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    CP
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Carlos Pérez</p>
                    <p className="text-gray-500 text-sm">Cliente desde 2022</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardContent>
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "Productos únicos y precios justos. Definitivamente volveré a comprar. ¡Altamente recomendado!"
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    AR
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Ana Rodríguez</p>
                    <p className="text-gray-500 text-sm">Cliente desde 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
