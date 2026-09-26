import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  private glowBeautyProducts: Product[] = [
    {
      _id: 'glow-1',
      name: 'Foundation, Mascara, Lipsticks, Face Primer Kit',
      brand: 'MAC',
      category: 'Makeup',
      features: ['Foundation', 'Mascara', 'Lipsticks', 'Face Primer'],
      price: 4999,
      image: 'assets/images/kit.jpg'
    },
    {
      _id: 'glow-2',
      name: 'Skin Care Essentials',
      brand: "L'Oreal",
      category: 'Skincare',
      features: ['Sheet Mask', 'Face Wash', 'Sun Protection Cream', 'Face Serum'],
      price: 1699,
      image: 'assets/images/skin.jpg'
    },
    {
      _id: 'glow-3',
      name: 'Hair Care Essentials',
      brand: 'Dove',
      category: 'Hair Care',
      features: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask'],
      price: 1000,
      image: 'assets/images/hair.jpg'
    },
    {
      _id: 'glow-4',
      name: 'Body Care & Fragrance Set',
      brand: 'Jo Malone',
      category: 'Body Care & Fragrances',
      features: ['Body Scrub', 'Feel Alive Mist', 'Shower Gel', 'Perfume'],
      price: 2500,
      image: 'assets/images/frag.jpg'
    },
    {
      _id: 'glow-5',
      name: 'Fit Me Makeup Set',
      brand: 'Maybelline',
      category: 'Makeup',
      features: ['Fit Me Foundation', 'Concealer', 'Compact Powder', 'Setting Spray'],
      price: 1200,
      image: 'assets/images/maybelline.png'
    },
    {
      _id: 'glow-6',
      name: 'Eyeshadow & Contour Set',
      brand: 'Huda Beauty',
      category: 'Makeup',
      features: ['Eyeshadow Palette', 'Liquid Lipstick', 'Contour Palette', 'Highlighter'],
      price: 2720,
      image: 'assets/images/huda.jpeg'
    },
    {
      _id: 'glow-7',
      name: 'Face & Nail Essentials',
      brand: 'Lakme',
      category: 'Makeup',
      features: ['Primer', 'CC Cream', 'Kajal', 'Nail Polish'],
      price: 1099,
      image: 'assets/images/lakme.jpg'
    },
    {
      _id: 'glow-8',
      name: 'Lip & Face Set',
      brand: 'Nykaa',
      category: 'Makeup',
      features: ['Lip Crayon', 'Compact Powder', 'Face Mist', 'Blush'],
      price: 1200,
      image: 'assets/images/nyka.avif'
    },
    {
      _id: 'glow-9',
      name: 'Vitamin C Skincare Set',
      brand: 'Mamaearth',
      category: 'Skincare',
      features: ['Vitamin C Face Wash', 'Face Serum', 'Moisturizer', 'Sunscreen SPF 50'],
      price: 599,
      image: 'assets/images/maearth.jpg'
    },
    {
      _id: 'glow-10',
      name: 'Body Care Set',
      brand: 'The Body Shop',
      category: 'Body Care & Fragrances',
      features: ['Body Butter', 'Body Wash', 'Body Scrub', 'Hand Cream'],
      price: 1499,
      image: 'assets/images/body.png'
    },
    {
      _id: 'glow-11',
      name: 'Active Skincare Set',
      brand: 'Minimalist',
      category: 'Skincare',
      features: ['Face Serum', 'Cleanser', 'Moisturizer', 'Sunscreen'],
      price: 999,
      image: 'assets/images/mini.avif'
    },
    {
      _id: 'glow-12',
      name: 'Soft Glam Makeup Set',
      brand: 'Rare Beauty',
      category: 'Makeup',
      features: ['Liquid Blush', 'Lip Color', 'Highlighter', 'Mascara'],
      price: 4500,
      image: 'assets/images/rare.jpg'
    }
  ];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return of(this.glowBeautyProducts);
  }

  getProductById(id: string): Observable<Product> {
    const product = this.glowBeautyProducts.find(p => p._id === id);

    if (product) {
      return of(product);
    }

    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  updateProduct(id: string, data: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}