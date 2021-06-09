import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldAvatarToKids1623282980124
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'kids',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('kids', 'avatar');
  }
}
