<template>
  <div class="card" @click.self="openModal">
    <button class="close-button" @click="removeCardFromList">×</button>

    <div class="body">
      <span class="label" :class="`label-${selectedLabel}`">{{ selectedLabel }}</span>
      {{ body }}
    </div>

    <div class="example-modal-window">
      <Modal @close="closeModal" v-if="modal">
        <div>
          ラベル
          <v-select :options="labels" v-model="selectedLabel" label="name" class="v-select">
            <template v-slot:no-options>
              <span class="vs__no-options">選択肢が存在しません</span>
            </template>
          </v-select>

        </div>
        <div>
          <p><input v-model="inputText" placeholder="title" /></p>
        </div>
        <div>
          説明
          <textarea v-model="textareaText" placeholder="詳しい説明を入力してください"></textarea>
        </div>
        <template slot="footer">
        </template>
      </Modal>
    </div>
  </div>
</template>


<script>
import Modal from './Modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      modal: false,
      labels: ["red", "blue", "green", "yellow"], // ラベルの選択肢
      selectedLabel: "", // 選択されたラベル
      inputText: "",     // inputの値
      textareaText: "",  // textareaの値
      inputArray: []     // 入力値をまとめる配列
    };
  },
  created() {
    this.loadData(); // コンポーネントが生成されたときにデータを復元
  },
  props: {
    body: {
      type: String,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    },
    cardIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeCardFromList() {
      if (confirm('本当にこのカードを削除しますか？')) {
        this.$store.dispatch('removeCardFromList', {
          cardIndex: this.cardIndex,
          listIndex: this.listIndex,
        });
      }
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    // 入力欄をクリアする
    clearInputs() {
      this.selectedLabel = "";
      this.inputText = "";
      this.textareaText = "";
    },
    // 配列のデータをlocalStorageに保存
    saveArrayToLocalStorage() {
      const key = `userInputs_${this.listIndex}_${this.cardIndex}`;
      localStorage.setItem(key, JSON.stringify(this.inputArray));
    },
    // ページリロード時に配列とフィールドの内容を復元
    loadData() {
      const key = `userInputs_${this.listIndex}_${this.cardIndex}`;
      const storedArray = localStorage.getItem(key);

      if (storedArray) {
        this.inputArray = JSON.parse(storedArray);
      }

      this.selectedLabel = localStorage.getItem(`selectedLabel_${this.listIndex}_${this.cardIndex}`) || "";
      this.inputText = localStorage.getItem(`inputText_${this.listIndex}_${this.cardIndex}`) || "";
      this.textareaText = localStorage.getItem(`textareaText_${this.listIndex}_${this.cardIndex}`) || "";
    },
  },
  watch: {
    selectedLabel(newVal) {
      const key = `selectedLabel_${this.listIndex}_${this.cardIndex}`;
      localStorage.setItem(key, newVal);
    },
    inputText(newVal) {
      const key = `inputText_${this.listIndex}_${this.cardIndex}`;
      localStorage.setItem(key, newVal);
    },
    textareaText(newVal) {
      const key = `textareaText_${this.listIndex}_${this.cardIndex}`;
      localStorage.setItem(key, newVal);
    },
    inputArray: {
      handler() {
        this.saveArrayToLocalStorage();
      },
      deep: true,
    },
  },
};

</script>