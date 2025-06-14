import { Injectable } from '@angular/core';

export interface ISector {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  private readonly items: ISector[] = [
    {
      code: 'materials',
      name: 'Сырьевая промышленность',
    },
    {
      code: 'consumer',
      name: 'Потребительские товары и услуги',
    },
    {
      code: 'realEstate',
      name: 'Недвижимость',
    },
    {
      code: 'it',
      name: 'Информационные технологии',
    },
    {
      code: 'financial',
      name: 'Финансовый сектор',
    },
    {
      code: 'energy',
      name: 'Энергетика',
    },
    {
      code: 'utilities',
      name: 'Электроэнергетика',
    },
    {
      code: 'other',
      name: 'Другое',
    },
    {
      code: 'health_care',
      name: 'Здравоохранение',
    },
    {
      code: 'green_energy',
      name: 'Зеленая энергетика',
    },
    {
      code: 'ecomaterials',
      name: 'Материалы для эко-технологий',
    },
    {
      code: 'industrials',
      name: 'Машиностроение и транспорт',
    },
    {
      code: 'telecom',
      name: 'Телекоммуникации',
    },
    {
      code: 'electrocars',
      name: 'Электротранспорт и комплектующие',
    },
    {
      code: 'green_buildings',
      name: 'Энергоэффективные здания',
    },
  ];

  constructor() {}

  public getItems(): ISector[] {
    return this.items;
  }

  public getItemByCode(code: ISector['code']): ISector | null {
    return this.items.find((item) => item.code === code) || null;
  }
}
