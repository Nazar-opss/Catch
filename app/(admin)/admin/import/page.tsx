import JsonImporter from '@/components/admin/JsonImporter'
import React from 'react'

export default function ImportPage() {
  return (
    <div>
        <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Імпорт даних</h1>
        <p className="text-muted-foreground mt-2">
          Завантажте файл для масового додавання нових знижок у систему.<br/>
        Підтримуються лише файли у форматі .json. Переконайтеся, що структура даних відповідає вимогам бази.
        </p>
      </div>    
        <JsonImporter/>
    </div>
  )
}
