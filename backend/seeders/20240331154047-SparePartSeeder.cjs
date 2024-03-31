"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("spare_parts", [
      {
        spare_part_code: "12191-K15-900",
        tipe_motor_id: "1",
        name: "GASKET, CYLINDER",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/GASKET,CYLINDER.jpg",
        stock: Math.floor(Math.random() * 1000),
        price: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spare_part_code: "14430-KSP-910",
        tipe_motor_id: "2",
        name: "ARM COMP VALVE ROCKER",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/ARM COMP VALVE ROCKER.jpg",
        stock: Math.floor(Math.random() * 1000),
        price: 195000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spare_part_code: "17211-K15-900",
        tipe_motor_id: "3",
        name: "ELEMENT COMP, AIR/C",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/ELEMENT COMP,AIR C.jpg",
        stock: Math.floor(Math.random() * 1000),
        price: 48000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spare_part_code: "18318-K25-600ZA",
        tipe_motor_id: "4",
        name: "PROTECTOR, MUFFLER *TBLACK*",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/PROTECTOR, MUFFLER TBLACK.jpg",
        stock: Math.floor(Math.random() * 1000),
        price: 30000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spare_part_code: "18318-K25-900",
        tipe_motor_id: "5",
        name: "PROTECTOR, MUFFLER",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/PROTECTOR, MUFFLER.jpg",
        stock: Math.floor(Math.random() * 1000),
        price: 33000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spare_part_code: "18318-K59-A10",
        tipe_motor_id: "6",
        name: "PROTECTOR, MUFFLER",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/PROTECTOR, MUFFLER1.jpg",
        stock: Math.floor(Math.random() * 1000),
        price: 30000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spare_part_code: "2212A-K36-T00",
        tipe_motor_id: "7",
        name: "ROLLER WEIGHT SET",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/ROLLER WEIGHT SET.jpg",
        stock: Math.floor(Math.random() * 1000),
        price: 47000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spare_part_code: "23100-K35-V01",
        tipe_motor_id: "8",
        name: "BELT DRIVE",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/BELT DRIVE.jpg",
        stock: Math.floor(Math.random() * 1000),
        price: 120000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spare_part_code: "30410-KVB-N51",
        tipe_motor_id: "9",
        name: "UNIT COMP, CDI",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/UNIT COMP,CDI.jpg",
        stock: Math.floor(Math.random() * 1000),
        price: 575000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spare_part_code: "30700-KWN-712",
        tipe_motor_id: "10",
        name: "CAP ASSY NOISE SUP",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis iste soluta enim asperiores repellendus aliquam laudantium hic, necessitatibus ut nisi aspernatur quis et ullam atque sed quas possimus, maiores quaerat vitae cupiditate? Eaque impedit animi provident. Labore unde inventore voluptatem eaque exercitationem aut voluptatum vero soluta voluptate deserunt neque, commodi, maiores cupiditate vel doloribus sequi impedit distinctio debitis nam dolorem reiciendis saepe iure tempore. Animi quis excepturi eius quibusdam nostrum beatae molestias saepe in laudantium natus eveniet neque voluptatem repellat quae officiis, odio, iure libero. Praesentium ad, at sunt esse quae nemo, similique ipsam tempore fugiat velit itaque iste.",
        image: "backend/assets/img/spare-part/CAP ASSY NOISE SUP.jpg",
        stock: Math.floor(Math.random() * 999) + 1,
        price: 30000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("spare_parts", null);
  },
};
